import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: NextRequest,
  params: { params: { profileId: string } }
) {
  try {
    const profileId = params && params.params && params.params.profileId;
    if (!profileId || typeof profileId !== "string") {
      throw new Error("Invalid ID");
    }
    if (req.method !== "GET") {
      return NextResponse.json({ status: 405 });
    }
    await serverAuth();

    const profile = await prismadb.profiles.findUnique({
      where: {
        id: profileId,
      },
    });

    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: profile?.favourites,
        },
      },
    });
    return NextResponse.json({ favouriteMovies, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
