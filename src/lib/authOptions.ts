import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@/app/models/userModel";
import { createProjectWithDefaults } from "@/app/api/auth/signup/route";
import { connect } from "@/app/dbConfig/dbConfig";
import { Project } from "@/app/models/todoModel";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  image?: string;
  data?: string[];
}

type AuthUser = {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  image?: string;
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connect();
        const user = await User.findOne({
          email: credentials.email,
        }).lean<IUser>();
        if (!user || !user.password) return null;

        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;

        return {
          id: String(user._id),
          name: user.username,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connect();

      if (account?.provider === "google" && user.email) {
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          const dummyPassword = await hash(uuidv4(), 12);

          dbUser = await User.create({
            username: user.name,
            email: user.email,
            password: dummyPassword,
            image: user.image,
          });
        }

        // we pass back MongoDB _id, not Google id
        user.id = dbUser._id.toString();

        // check if they already have projects
        const projects = await Project.find({ owner: dbUser._id });
        if (projects.length === 0) {
          const firstProject = await createProjectWithDefaults(
            dbUser._id,
            "First Project",
            "Getting Started",
            false
          );

          const inboxProject = await createProjectWithDefaults(
            dbUser._id,
            "Inbox",
            "Section",
            true
          );

          dbUser.data = [firstProject._id, inboxProject._id];
          await dbUser.save();
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as AuthUser).id || (user as AuthUser)._id || token.id;
        token.picture = (user as AuthUser).image || token.picture; 
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as AuthUser).id = token.id as string;
        (session.user as AuthUser).image = token.picture as string;
      }
      return session;
    },
  },
};
