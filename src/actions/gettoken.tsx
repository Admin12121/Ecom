"use server"

import { auth } from "@/auth";

export const getAccessToken = async (): Promise<string | null> => {
  const session = await auth(); 
  return session?.accessToken || null;
};

export const getUser = async () => {
  const session = await auth();
  return session?.user || null;
}