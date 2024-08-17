import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

import { prisma } from "../prisma/index";

export const authOptions: AuthOptions = {
    providers: [
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID ?? "",
        clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
      session: ({ session, token }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }),
    },
    session: {
      strategy: "jwt",
    },
  };
  

export const getNextServerSession = () => getServerSession(authOptions)