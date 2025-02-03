import { useSession, signOut } from "next-auth/react";

export const useAuthUser = () => {
  const session = useSession();

  const Update = async () => {
    await session.update();
  };

  return {
    user: session.data?.user,
    accessToken: session.data?.accessToken,
    status: session.status === "authenticated",
    signOut: signOut,
    update: Update,
  };
};
