// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access: string;
    refresh: string;
  }

  interface JWT {
    access: string;
    refresh: string;
  }
}
