import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json({ status: 405 });
    }
    const { currentUser } = await serverAuth();
    const Profiles = await prismadb.user.findMany({
      where: {
        id: {
          in: currentUser?.profile,
        },
      },
    });
    return NextResponse.json({ Profiles, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
