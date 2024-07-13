import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.accessToken) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}dj-rest-auth/google/`, {
            access_token: account.accessToken,
          });
          
          if (response.status === 200) {
            (user as any).jwt = response.data.access_token;
            return true;
          }
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as any).jwt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.jwt) {
        (session as any).jwt = token.jwt as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
