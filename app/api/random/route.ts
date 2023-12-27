import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextApiRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ status: 405 });
  }
  try {
    await serverAuth();
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return NextResponse.json(randomMovies,{status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
