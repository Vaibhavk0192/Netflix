import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();
      const { imageUrl, name } = await req.json();

      const profile = await prismadb.profiles.create({
        data: {
          name: name,
          imageUrl: imageUrl,
          userId: currentUser.id,
        },
      });

      return NextResponse.json(profile, { status: 200 });
    }
    return NextResponse.json({ status: 405 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth();
      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error(`Invalid movie ID`);
      }

      const user = await prismadb.user.findUnique({
        where: {
          email: currentUser.email || "",
        },
      });

      if (!user) {
        throw new Error(`User not found`);
      }

      const updateFavouritesIds = without(user.favouriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favouriteIds: updateFavouritesIds,
        },
      });

      return NextResponse.json(updatedUser, { status: 200 });
    }

    return NextResponse.json({ status: 405 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 400 });
  }
}
