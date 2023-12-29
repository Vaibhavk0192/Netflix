import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request, params: { params: { movieId: string } }) {
  if (req.method !== "GET") {
    return NextResponse.json({ status: 405 });
  }
  try {
    await serverAuth();

    const movieId = params && params.params && params.params.movieId;
    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Movie not found");
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 400 });
  }
}
