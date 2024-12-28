import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "nextjs-toploader/app";
import { useGetLoggedUserQuery } from "@/lib/store/Service/api";
import { UserRound } from "lucide-react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";
import { useDecryptedData } from "@/hooks/dec-data";

interface UserData {
  email: string;
  profile: string | null;
  phone: string | null;
  username: string;
  last_name: string;
  first_name: string;
  role: string;
  gender: string | null;
  dob: string | null;
}

export function UserNav({ align }: { align?: "center" | "end" | "start" }) {
  const router = useRouter();
  const { accessToken, signOut } = useAuthUser();
  const [user, setUser] = useState<UserData>();
  const { data: encryptedData, isLoading } = useGetLoggedUserQuery(
    { token: accessToken },
    { skip: !accessToken }
  );
  const { data, loading } = useDecryptedData(encryptedData, isLoading);
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  function truncateEmail(email: string, maxLength: number = 5): string {
    const [username, domain] = email.split("@");
    if (username.length > maxLength) {
      return `${username.substring(0, maxLength)}...@${domain}`;
    }
    return email;
  }

  const Logout = () => {
    toast.success("Logout Succed");
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-0 h-8 w-8 rounded-lg">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.profile || ""} alt={user?.username} />
            <AvatarFallback>
              <UserRound className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-none border-0 dark:bg-neutral-900/60 backdrop-blur"
        align={align || "end"}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.first_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ? truncateEmail(user.email) : ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role == "Admin" ? (
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              Dashboard
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => router.push("/orders")}>
            My orders
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/wishlist")}>
            Wishlist
            <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/help&feedback")}>
            Help & Feedback
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => Logout()}>
          Log out
          <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
