import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

//  NextAuth({
//
//            session: { strategy: "jwt" }, // sessions stored in JWT, not DB
//            providers: [
//            ========= google auth provider ==========
//            GoogleProvider({
//            clientId: process.env.GOOGLE_CLIENT_ID!,
//            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//                          }),
//
//         })
