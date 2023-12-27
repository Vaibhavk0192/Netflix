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
    const movies = await prismadb.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
