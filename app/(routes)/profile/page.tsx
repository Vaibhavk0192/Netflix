"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback } from "react";
import { NextPageContext } from "next";

// import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]
interface UserCardProps {
  name: string;
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
        </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
   </div>
  );
}


const Profile = () => {
  // const { data: session,status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/auth");
  //   },
  // });
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            {/* <UserCard name={currentUser?.name} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
