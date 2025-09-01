import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function requireUser() {
  const session = await getServerSession(authOptions); // auth options are google provider and cradientials provider
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id as string;
}
