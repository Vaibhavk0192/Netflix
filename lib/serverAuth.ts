import { NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";

import prismadb from "@/lib/prismadb";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async () => {
  const session = await getServerSession(AuthOptions);
  if (!session?.user?.email) {
      throw new Error("Not signed innnn");
    }
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
};
export default serverAuth;
