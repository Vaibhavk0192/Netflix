import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();
      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error(`invalid movie ID`);
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favouriteIds: {
            push: movieId,
          },
        },
      });

      return NextResponse.json(user, { status: 200 });
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
        throw new Error(`invalid movie ID`);
      }

      const updateFavouritesIds = without(currentUser.favouriteIds, movieId);

      const updatedUser = prismadb.user.update({
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
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
