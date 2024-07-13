import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.access_token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}api/accounts/dj-rest-auth/google/`,
            {
              access_token: account.access_token,
            }
          );

          if (response.status === 200) {
            const tokens = response.data;
            // Store tokens in the JWT token for further callbacks
            (user as any).tokens = tokens;
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.access = (user as any).tokens.access;
        token.refresh = (user as any).tokens.refresh;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.access && token.refresh) {
        session.access = token.access as string;
        session.refresh = token.refresh as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
