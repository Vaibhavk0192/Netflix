"use client";
import Headings from "@/components/Profile manage page/heading";
import AutoPlayText from "@/components/Profile manage page/Autoplayinput";
import Profilebuttons from "@/components/Profile manage page/profileButtons";
import DeletePage from "@/components/Profile manage page/DeletePage";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useCurrentProfile from "@/hooks/useCurrentProfile";
import useProfiles from "@/hooks/useProfiles";

const Manage = () => {
  const router = useRouter();
  const [isDelete, setisDelete] = useState(false);

  const params = useParams<{ profileId: string }>();
  const profileId = params.profileId;

  const { data: profile, mutate } = useCurrentProfile(profileId);
  const { data: profiles, mutate: mutateProfile } = useProfiles();
  const [name, setName] = useState("");
  console.log(profiles?.User?.length);

  useEffect(() => {
    setName(profile?.name || "");
  }, [profile]);
  const toggleDelete = () => {
    if (profiles && profiles.User.length > 1) {
      // setisDelete((prev) => !prev);
    }
    setisDelete((prev) => !prev);
    console.log(isDelete);
  };

  const handleSave = async () => {
    if (profile.name !== name) {
    }
    try {
      const response = await fetch("/api/nameChange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          profile: profile.id,
        }),
      });
      if (response) {
        const res = await response.json();
        console.log(res);
      }
      mutate({
        ...profile,
        name: name,
      });
      mutateProfile();
    } catch (err) {
      console.log(err);
    }

    router.back();
  };

  const resetback = () => {
    toggleDelete();
  };

  if (isDelete) {
    return (
      <div>
        <DeletePage
          func={resetback}
          name={profile.name}
          image={profile.imageUrl}
          profile={profile.id}
        />
      </div>
    );
  } else {
    return (
      <div className=" items-center flex justify-center ">
        <div className="w-full sm:mt-[4rem] max-sm:mt-[2rem] flex flex-wrap sm:self-center md:px-10 max-lg:px-10">
          <div className="lg:w-[43%] m-auto flex flex-col flex-wrap ">
            <div
              className="text-white max-sm:px-10 sm:text-[3.5rem] max-sm:text-[2rem] font-normal border-b "
              style={{ borderBottomColor: "#232323" }}
            >
              Edit Profile
            </div>
            <div className="flex sm:flex-row max-sm:flex-col mt-6 rounded">
              <img
                src={profile && profile.imageUrl}
                className=" h-32 object-contain max-sm:mb-5 rounded"
              />
              <div className="sm:ml-6 flex flex-col max-sm:px-10">
                <input
                  placeholder="Name"
                  className="bg-[#666666] px-2 py-2 text-white outline-none font-normal text-lg placeholder:text-[#CCCCCC] placeholder:pl-2 w-full rounded"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Headings heading="Languages" />
                <div className="mt-1">
                  <select
                    name="language"
                    id="language"
                    className="outline-none px-3 py-1 bg-black text-white border text-sm border-white hover:bg-[rgb(45,45,45)] rounded-sm"
                  >
                    <option defaultValue="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                    <option value="Dutch">Dutch</option>
                  </select>
                </div>
                <Headings heading="Game Handle" />
                <span className="text-white mt-4 text-sm font-normal">
                  Your handle is a unique name that will be used for playing
                  with other Netflix members across all Netflix games.
                </span>
                <input
                  placeholder="Create Game Handle"
                  className="bg-[#666666] mt-4 px-2 py-2 text-white outline-none font-normal text-lg placeholder:text-[#CCCCCC] placeholder:pl-2 rounded"
                />
                <hr className="border-1 h-px bg-[#232323] mt-10 border-transparent" />
                <Headings heading="Maturity Settings" />
                <span className="text-white text-sm mt-3 bg-[rgb(45,45,45)] py-2 px-4 w-max font-semibold rounded">
                  All Maturity Ratings
                </span>
                <span className="text-white text-sm mt-3 mb-8">
                  Show title of{" "}
                  <span className="font-semibold">all maturity ratings </span>
                  for this profile
                </span>
                <Profilebuttons text="Edit" />
                <hr className="border-1 h-px bg-[#232323] mt-8 border-transparent" />
                <Headings heading="Autoplay controls" />
                <br />
                <AutoPlayText text="Autoplay next episodes in series for all devices." />
                <AutoPlayText text="Autoplay previews while browsing on all devices." />
              </div>
            </div>
            <hr className="border-1 bg-[#232323] mt-8 border-transparent" />
            <div className="flex mt-8 max-sm:flex-wrap gap-4 mb-10 max-sm:px-10">
              <button
                className="w-max px-6 py-1 bg-white hover:bg-[#e50914] hover:text-white font-semibold text-[1.25rem] max-sm:self-center max-sm:w-full max-sm:px-10 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <div className=" flex gap-4 max-sm:w-full max-sm:gap-4 max-sm:justify-around">
                <div
                  onClick={() => {
                    router.back();
                  }}
                >
                  <Profilebuttons text="Cancel" />
                </div>
                <div onClick={toggleDelete}>
                  <Profilebuttons text="Delete Profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Manage;
