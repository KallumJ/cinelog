import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const options: AuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!!,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}

export const handler = NextAuth(options);

export { handler as GET, handler as POST };