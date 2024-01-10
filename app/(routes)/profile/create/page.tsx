"use client";
import Profilebuttons from "@/components/Profile manage page/profileButtons";
import useProfiles from "@/hooks/useProfiles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {AiOutlineCheck } from "react-icons/ai";

const CreateProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("invisible");
  const [clicked, setClicked] = useState(false);
  const { data: profiles, mutate } = useProfiles();
  const [isClicked, setisClicked] = useState(false)

    const toggleClick=()=>{
        setisClicked((prev)=>!prev)
    }

  const handleCreate = async () => {
    setClicked(true);
    setError("invisible");
    const profileName: any[] = [];
    profiles.User.forEach((profile: any) => {
      profileName.push(profile.name);
    });
    console.log(profileName);
    if (profileName.includes(name)) {
      setError("visible");
      setClicked(false);
      return;
    }
    if (name === "") {
      setError("visible");
      setClicked(false);
      return;
    }
    try {
      const createProfileResponse = await fetch("/api/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: "/images/default-green.png",
          name: name,
        }),
      });

      if (createProfileResponse.ok) {
        const data = await createProfileResponse.json();
        console.log("Profile created successfully:", data);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
    mutate();
    router.push("/profile");
  };
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col m-auto mt-36 lg:w-[40%] sm:w-[60%] md:w-[60%] flex-wrap max-sm:w-[90%]">
        <div className="text-white text-[3.5rem] font-normal ">Add Profile</div>
        <div className="text-[1.25rem] text-[#666666] mt-2">
          Add a profile for another person watching Netflix
        </div>
        <hr className="border-1 h-px bg-[#232323] mt-4 border-transparent" />
        <div className="flex items-center mt-4 py-2 sm:gap-6 max-sm:gap-2">
          <img
            src="/images/default-blue.png"
            className="lg:w-32 lg:h-32 rounded-md max-sm:w-16 sm:w-24"
          />
          <div className="w-full h-full">
            <input
              placeholder="Name"
              className="bg-[#666666] px-2 py-2 text-white outline-none font-normal text-lg placeholder:text-[#CCCCCC]  w-full sm:mt-8 max-sm:mt-4"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className={`flex text-red-500 mt-1 max-sm:text-xs ${error}`}>
              There is a issue! Try again
            </div>
          </div>
          <div className="flex items-center sm:gap-2 max-sm:gap-1">
            <div className="sm:h-8 sm:w-8 max-sm:w-6 max-sm:h-6 border border-[#666666] flex justify-center items-center transition" onClick={toggleClick}>{isClicked?<AiOutlineCheck className="text-[#c0cccc] size-8"/>:null}</div>
            <span className="text-white sm:text-[1.25rem]  max-sm:text-sm">Child?</span>
          </div>
        </div>
        <hr className="border-1 h-px bg-[#232323] mt-6 border-transparent" />
        <div className="flex gap-4 items-center mt-10">
          <button
            className="w-max px-6 py-1 bg-white hover:bg-[#e50914] hover:text-white font-semibold text-[1.25rem] flex items-center justify-center"
            disabled={clicked}
            onClick={handleCreate}
          >
            Continue
          </button>
          <div
            onClick={() => {
              router.back();
            }}
          >
            <Profilebuttons text="Cancel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
