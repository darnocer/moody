// /pages/api/auth/[...nextauth].tsx

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.SECRET ?? "",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        // Check if the user record exists in the database
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
          include: {
            accounts: true,
          },
        });

        if (existingUser) {
          // If the user record exists, check if the Google account is already linked
          const googleAccount = existingUser.accounts.find(
            (acc) => acc.provider === "google"
          );

          if (!googleAccount && account.providerAccountId) {
            // If the Google account is not linked, create a new account record
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: "oauth",
                provider: "google",
                providerAccountId: account.providerAccountId.toString(),
              },
            });
          }
        } else if (user.email && user.name && account.providerAccountId) {
          // If the user record doesn't exist, create a new one
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image ?? undefined,
              emailVerified: new Date(),
              accounts: {
                create: {
                  type: "oauth",
                  provider: "google",
                  providerAccountId: account.providerAccountId.toString(),
                },
              },
            },
          });
        }
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
