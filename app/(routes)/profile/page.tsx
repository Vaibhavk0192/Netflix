"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Profile = () => {
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
    <div>
      <p className="text-white text-4xl">Profiles</p>
    </div>
  );
};

export default Profile;
