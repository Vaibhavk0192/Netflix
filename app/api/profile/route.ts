import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();
      const { imageUrl, name } = await req.json();

      if (currentUser.profile){
        
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
      console.log(profileList);

      profileList.push(profileData.id);
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

export async function DELETE(req: Request) {
  try {
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth();
      const { ProfileId } = await req.json();

      const existingProfile = await prismadb.profiles.findUnique({
        where: {
          id: ProfileId,
        },
      });

      if (!existingProfile) {
        throw new Error(`Invalid Profile ID`);
      }

      const user = await prismadb.user.findUnique({
        where: {
          email: currentUser.email || "",
        },
      });

      if (!user) {
        throw new Error(`User not found`);
      }

      const updatedProfile = without(user.profile, ProfileId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          profile: updatedProfile,
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
