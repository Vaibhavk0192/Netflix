"use client";
import userCurrentUser from "@/hooks/useCurrentuser";
import useProfiles from "@/hooks/useProfiles";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
      className="group flex-row w-40 mx-auto"
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
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
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
    if (list.length == 0) {
      setLoading(false);
    }
    return list;
  }, [currentUser]);

  const { data: profiles, mutate } = useProfiles();

  const makeProfile = async () => {
    console.log(isProfile);
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
  }, [isProfile, currentUser]);

  const [isPlus,setisPlus]=useState(true)
   if(profiles && profiles.User.length>3){
    setisPlus(false)
   }
    return (
      <div className="flex h-full justify-center w-full items-center">
        <div className="flex flex-col w-full">
          <h1 className="lg:text-[3rem] md:text-4xl text-white text-center">
            Who&#39;s watching?
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={() => {}}>
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
            </div>
            {(!isVisible && isPlus)? (
              <div className="flex flex-col group" onClick={()=>{router.push("/profile/create")}}>
                <div className="w-40 h-40 flex items-center justify-center border-2 border-transparent  overflow-hidden rounded-md hover:bg-white group-hover:cursor-pointer  group-hover:border-white group-hover:text-white">
                  <BiSolidPlusCircle className="text-gray-400 " size={100} />
                </div>
                <span className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
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
