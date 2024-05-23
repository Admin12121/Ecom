"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/lib/store/Feature/authSlice";
import { getToken, storeToken } from "@/lib/store/Service/LocalStorageServices";
import { useLoginUserMutation } from "@/lib/store/Service/User_Auth_Api";
import { toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const Login: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const [server_error, setServerError] = useState<Record<string, string[]>>({});
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(server_error).length > 0) {
      const errorKey = Object.keys(server_error)[0];
      if (server_error[errorKey] && server_error[errorKey].length > 0) {
        const errorMessage = server_error[errorKey][0];
        toast.error(errorMessage, {
          action: {
            label: "X",
            onClick: () => toast.dismiss(),
          },
        });
      }
    }
  }, [server_error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(process.env.BACKEND_DOMAIN);
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const data = new FormData(formElement);
    const actualData = {
      username: data.get("username"),
      password: data.get("password"),
      grant_type: "password",
      client_secret: "3MrkT8TibwcB7ouH6pC03T6BltkUva3XuafBd6eWNdvXILxxGyrQp6QKUfHL56njbncd7xotvxnaCcOuy84nN4aPEy8HDvD6d4suwMzxwC5Br1wtWVmnrbKRuq8n7mpY",
      client_id: "C1MV3cBor3Ai2t8vD4edU9upHt1MXaGS5du4fKwB"
    };
    const res = await loginUser(actualData);
    if (res.error) {
      console.log("error", res.error);
      // setServerError(res.error.data.errors);
    }
    if (res.data) {
      storeToken(res.data);
      const { access_token }: { access_token: any } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
      toast.success("Login successful", {
        action: {
          label: "X",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 max-w-[450px]">
              Log in
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="email"
                    name="username"
                    label="Email"
                    isRequired
                    onClear={() => {}}
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input type="password" name="password" label="Password" isRequired/>
                </div>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">Sign in</Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
