import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  params: { params: { profileId: string } }
) {
  if (req.method !== "GET") {
    return NextResponse.json({ status: 405 });
  }
  try {
    await serverAuth();

    const profileId = params && params.params && params.params.profileId;
    if (!profileId || typeof profileId !== "string") {
      throw new Error("Invalid ID");
    }

    const profile = await prismadb.profiles.findUnique({
      where: {
        id: profileId,
      },
    });

    if (!profile) {
      throw new Error("Movie not found");
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 400 });
  }
}

export const dynamic = 'auto'