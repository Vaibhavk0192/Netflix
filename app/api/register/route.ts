import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ status: 405 });
    }
    const { email, name, password } = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json({status:422,error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
