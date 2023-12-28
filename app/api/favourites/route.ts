import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json({ status: 405 });
    }
    const { currentUser } = await serverAuth();
    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });
    return NextResponse.json({ favouriteMovies, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
