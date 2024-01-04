"use client";
import userCurrentUser from "@/hooks/useCurrentuser";
import useProfiles from "@/hooks/useProfiles";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

interface UserCardProps {
  name: string;
  image: string;
  id: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, image, id }) => {
  const router = useRouter();
  return (
    <div
      className="group flex-row w-40 mx-auto"
      onClick={() => {
        router.push(`/in/${id}`);
      }}
    >
      <div className="w-25 h-25 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <img
          draggable={false}
          className="w-max h-max object-contain"
          src={image}
          alt=""
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};
const Profile = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: currentUser } = userCurrentUser();


  const isProfile = useMemo(() => {
    if (!currentUser) {
      return;
    }
    const list = currentUser.currentUser.profile;
    return list;
  }, [currentUser]);

  const { data: profiles } = useProfiles();

  const makeProfile = async () => {
    if (isProfile === undefined) {
      return;
    }

    const username = currentUser.currentUser.name;
    setName(username);
    const image = images[0];

    if (!name && !image) {
      return;
    }

    if (isProfile.length === 0) {
      try {
        setLoading(true);

        const createProfileResponse = await fetch("/api/createProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: image,
            name: username,
          }),
        });

        if (createProfileResponse.ok) {
          const data = await createProfileResponse.json();
          console.log("Profile created successfully:", data);
        }
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      makeProfile();

    }
  }, [isProfile]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-4xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => {}}>
            {profiles &&
              profiles.User.map((i: any) => (
                <UserCard id={i.id} name={i.name} image={i.imageUrl} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
