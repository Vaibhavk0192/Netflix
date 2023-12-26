"use client";
import Navbar from "../components/Navbar";
import BillBoard from "../components/BillBoard";
import MovieList from "../components/MovieList";


export default function Home() {
// video time 2:54:22
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
