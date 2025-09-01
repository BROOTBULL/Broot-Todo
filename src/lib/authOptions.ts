import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@/app/models/userModel";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string; 
  image?: string;
}
type AuthUser = {
  id?: string;       
  _id?: string;      
  name?: string;
  email?: string;
  image?: string;
};


export const authOptions: NextAuthOptions = {

  session: { strategy: "jwt" }, // sessions stored in JWT, not DB
  
  providers: [
 
    // ==== google auth provider ====
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ==== manual cradientials provider =====
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log(credentials);
        
        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email }).lean<IUser>()
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

  async jwt({ token, user }) // callback return jwt 
   {
    if (user) {
      token.id = (user as AuthUser).id || (user as AuthUser)._id || token.id;
    }
    return token;
  },

  async session({ session, token })  // and cookies in sessions 
  {
    if (session.user && token?.id) {
      (session.user as AuthUser).id = token.id as string;
    }
    return session;
  },

},

};
