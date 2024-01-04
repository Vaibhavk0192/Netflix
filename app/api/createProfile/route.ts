import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();
      const { imageUrl, name } = await req.json();
      console.log(currentUser.profile);

      if (currentUser.profile.length > 0) {
        throw new Error("profile already exists");
      }
      
      const profileData = await prismadb.profiles.create({
        data: {
          name: name,
          imageUrl: imageUrl,
          userId: currentUser.id,
        },
      });
      console.log(profileData);
      let profileList = [profileData.id];
      const userUpdated = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          profile: {
            push: profileList,
          },
        },
      });

      return NextResponse.json(userUpdated, { status: 200 });
    }
    return NextResponse.json({ status: 405 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
