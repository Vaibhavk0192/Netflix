import { NextApiRequest } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextApiRequest) {
  if (req.method !== "GET") {
    return Response.json({ status: 405 });
  }
  try {
    await serverAuth();
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return Response.json(randomMovies, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ status: 400 });
  }
}
export const dynamic = "force-dynamic"
