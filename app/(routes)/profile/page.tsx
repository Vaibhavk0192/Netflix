"use client";
import userCurrentUser from "@/hooks/useCurrentuser";
import useProfiles from "@/hooks/useProfiles";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import Profilebuttons from "@/components/Profile manage page/profileButtons";
import { FaPencilAlt } from "react-icons/fa";
import { BiSolidPlusCircle } from "react-icons/bi";

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
  visible: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ name, image, id, visible }) => {
  const router = useRouter();
  return (
    <div
      className="group flex-row lg:w-40 mx-auto max-sm:w-40 sm:w-40"
      onClick={() => {
        !visible
          ? router.push(`/in/${id}`)
          : router.push(`/profile/manage/${id}`);
      }}
    >
      <div className="relative w-25 h-25 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <img
          draggable={false}
          className="w-max h-max object-contain"
          src={image}
          alt=""
        />
        {visible ? (
          <div
            onClick={() => {}}
            className="absolute w-full h-full bg-black bg-opacity-35 flex items-center justify-center text-white z-10"
          >
            <FaPencilAlt size={35} />
          </div>
        ) : null}
      </div>
      <div className="mt-4 text-gray-400 lg:text-2xl text-center group-hover:text-white sm:text-xl">
        {name}
      </div>
    </div>
  );
};
const Profile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: currentUser } = userCurrentUser();
  const [isPlus, setisPlus] = useState(true);

  const [isVisible, setisVisible] = useState(false);

  const toggleVisible = () => {
    setisVisible((prev) => !prev);
  };

  const resetback = () => {
    toggleVisible();
  };

  const isProfile = useMemo(() => {
    if (!currentUser) {
      return;
    }
    const list = currentUser.currentUser.profile;
    if (list && list.length == 0) {
      setLoading(false);
    }
    return list || [];
  }, [currentUser]);

  const { data: profiles, mutate } = useProfiles();
  useEffect(() => {
    const user = currentUser?.currentUser?.name;
    setName(user);
  }, [currentUser]);

  const makeProfile = async () => {
    console.log(isProfile);
    if (isProfile === undefined) {
      return;
    }
    const username = currentUser.currentUser.name;
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
        mutate();
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      makeProfile();
    }
    if (profiles && profiles.User.length >= 4) {
      setisPlus(false);
    }
    if (profiles && profiles.User.length < 4) {
      setisPlus(true);
    }
  }, [isProfile, currentUser, isPlus, profiles]);

  return (
    <div className="flex h-full justify-center w-full items-center">
      <div className="flex flex-col w-full">
        <h1 className="lg:text-[3rem] sm:text-[2.75rem] max-sm:text-[2.5rem] text-white text-center">
          {isVisible?"Manage Profiles:":"Who's watching?"}
        </h1>
        <div className="flex flex-row items-center justify-center gap-8 mt-10 flex-wrap">
          <div onClick={() => {}} className="flex gap-4 flex-wrap">
            <Suspense fallback={<p>Loading</p>}>
              {profiles &&
                profiles.User.map((i: any) => (
                  <UserCard
                    key={i.id}
                    id={i.id}
                    name={i.name}
                    image={i.imageUrl}
                    visible={isVisible}
                  />
                ))}
            </Suspense>
          </div>
          {!isVisible && isPlus ? (
            <div
              className="flex flex-col group md:w-28 lg:w-40 justify-center items-center"
              onClick={() => {
                router.push("/profile/create");
              }}
            >
              <div className="md:w-28 lg:w-40 lg:h-40 md:h-28 flex items-center justify-center border-2 border-transparent  overflow-hidden rounded-md hover:bg-white group-hover:cursor-pointer  group-hover:border-white group-hover:text-white">
                <BiSolidPlusCircle className="text-gray-400 " size={100} />
              </div>
              <span className="mt-4 text-gray-400 lg:text-2xl text-center group-hover:text-white sm:text-xl">
                Add Profile
              </span>
            </div>
          ) : null}
        </div>

        {isVisible ? (
          <button
            className="w-max px-6 py-1 bg-white hover:bg-[#e50914] hover:text-white font-semibold text-[1.25rem] flex mt-16 items-center justify-center mx-auto"
            onClick={resetback}
          >
            Done
          </button>
        ) : (
          <div className="flex justify-center mt-16 " onClick={toggleVisible}>
            <Profilebuttons text="Manage Profiles" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
