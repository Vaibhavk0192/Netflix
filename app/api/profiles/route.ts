import { NextRequest } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return Response.json({ status: 405 });
    }
    const { currentUser } = await serverAuth();
    const User = await prismadb.profiles.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    return Response.json({ User, status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ status: 400 });
  }
}

export const dynamic = "force-dynamic"
