import NextAuth from "next-auth";

// Import is only for TypeScript module augmentation.
// It does nothing at runtime but lets us extend NextAuth's types.


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}


// Extend NextAuth types so TS knows about custom fields like user.id , ._id , .id , .userId.
// Needed because NextAuth's default Session type only has name, email, image.
