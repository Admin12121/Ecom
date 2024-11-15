import { useSession, signOut } from "next-auth/react";

export const authUser = () => {
    const session = useSession();
    return {
        user: session.data?.user,
        accessToken: session.data?.accessToken,
        status: session.status === "authenticated",
        signOut: signOut
    };
}