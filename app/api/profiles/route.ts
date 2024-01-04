import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json({ status: 405 });
    }
    const { currentUser } = await serverAuth();
    const User = await prismadb.profiles.findMany({
      where: {
        userId: currentUser.id, 
      },
    });
    return NextResponse.json({ User, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
