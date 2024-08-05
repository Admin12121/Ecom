import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IoIosAdd as PlusIcon } from "react-icons/io";
import React from "react";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          className="bg-foreground text-background"
          endContent={<PlusIcon size={18} />}
          size="sm"
        >
          Add New
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="auto"
          backdrop="blur"
          // className="bg-neutral-950"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add User
                </ModalHeader>
                <ModalBody>
                  <Input size="sm" label="Email" />
                  <Input size="sm" label="First Name" />
                  <Input size="sm" label="Last Name" />
                  <Input size="sm" label="Phone Number" />

                  <Input size="sm" label="Password" type="password" />
                  <Input size="sm" label="Confirm Password" type="password" />
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-foreground text-background" size="sm">
                    Add User
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
