"use client";
import userCurrentUser from "@/hooks/useCurrentuser";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const { data: currentUser } = userCurrentUser();

  return (
    <>
      <div className="text-2xl text-green-500">Netflix Clone</div>;
      <p className="text-white">
        logged in as: {currentUser?.currentUser?.email}
      </p>
      <button
        className="h-10 w-full bg-white"
        onClick={() => {
          signOut();
        }}
      >
        LogOut
      </button>
    </>
  );
}
