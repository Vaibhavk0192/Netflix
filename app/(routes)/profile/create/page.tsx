"use client";
import Profilebuttons from "@/components/Profile manage page/profileButtons";
import useProfiles from "@/hooks/useProfiles";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("invisible");
  const [clicked, setClicked] = useState(false);
  const { data: profiles, mutate } = useProfiles();

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
      <div className="flex flex-col m-auto mt-36 lg:w-[40%] sm:w-[60%] md:w-[70%] flex-wrap min-[320px]:w-[90%] min-[900px]:w-[60%]">
        <div className="text-white text-[3.5rem] font-normal ">Add Profile</div>
        <div className="text-[1.25rem] text-[#666666] mt-2">
          Add a profile for another person watching Netflix
        </div>
        <hr className="border-1 h-px bg-[#232323] mt-4 border-transparent" />
        <div className="flex items-center mt-4 py-2 gap-6">
          <img
            src="/images/default-blue.png"
            className="lg:w-32 lg:h-32 rounded-md min-[320px]:w-20"
          />
          <div>
            <input
              placeholder="Name"
              className="bg-[#666666] px-2 py-2 text-white outline-none font-normal text-lg placeholder:text-[#CCCCCC]  w-full"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className={`flex text-red-500 mt-1 ${error}`}>
              There is a issue! Try again
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 border border-[#666666]"></div>
            <span className="text-white text-[1.25rem]">Child?</span>
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
