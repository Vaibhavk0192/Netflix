"use client";
import Navbar from "../components/Navbar";

export default function Home() {
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

