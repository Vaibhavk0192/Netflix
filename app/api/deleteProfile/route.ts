import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without,add } from "lodash";

export async function DELETE(req: NextRequest) {
  try {
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth();
      const { profileId } = await req.json();   
      const user = await prismadb.profiles.delete({
        where: {
          id: profileId,
        },
      });

      
      const updatedProfile = without(currentUser.profile, profileId);

      const res = await prismadb.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          profile: {
            set: updatedProfile,
          },
        },
      });

      return NextResponse.json(res, { status: 200 });
    }
    return NextResponse.json({ status: 405 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
export const dynamic = "force-dynamic"