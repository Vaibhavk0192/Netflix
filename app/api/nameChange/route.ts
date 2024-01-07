import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      await serverAuth();
      const { name, profile } = await req.json();

      const user = await prismadb.profiles.update({
        where: {
          id: profile || "",
        },
        data: {
          name: name,
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
