import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import { User } from "../models/User";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Email",
      credentials: { email: { label: "Email", type: "text" } },
      async authorize(credentials) {
        await connectDB();
        const email = credentials?.email as string;
        if (!email) return null;
        let user = await User.findOne({ email });
        if (!user) user = await User.create({ email });
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.email = (user as any).email;
      return token;
    },
    async session({ session, token }) {
      (session as any).user.email = (token as any).email;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

