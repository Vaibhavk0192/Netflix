"use client";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
    const { data: session,status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
    </>
  );
}
