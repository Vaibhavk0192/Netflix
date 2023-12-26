"use client";
import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar"
import BillBoard from "../components/BillBoard"
import MovieList from "../components/MovieList"

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
      <BillBoard/>
      <div className="pb-40">
      <MovieList title="trending Now"/>
      </div>
    </>
  );
}

