import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      await serverAuth();
      const { movieId, profile } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error(`invalid movie ID`);
      }

      const user = await prismadb.profiles.update({
        where: {
          id: profile || "",
        },
        data: {
          favourites: {
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
      const { movieId,profile } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error(`Invalid movie ID`);
      }

      const user = await prismadb.profiles.findUnique({
        where: {
          id: profile || "",
        },
      });

      if (!user) {
        throw new Error(`Profile id not found`);
      }

      const updateFavouritesIds = without(user.favourites, movieId);

      const updatedUser = await prismadb.profiles.update({
        where: {
          id: profile || "",
        },
        data: {
          favourites: updateFavouritesIds,
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
