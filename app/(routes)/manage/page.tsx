"use client";
import Headings from "@/components/Profile manage page/heading";
import AutoPlayText from "@/components/Profile manage page/Autoplayinput";
import Profilebuttons from "@/components/Profile manage page/profileButtons";
import DeletePage from "@/components/Profile manage page/DeletePage"
import React, { useState } from "react";

const Manage = () => {
  const [isDelete, setisDelete] = useState(false);
  const toggleDelete = () => {
    setisDelete((prev) => !prev);
    console.log(isDelete);
  };

  const resetback=()=>{
    toggleDelete();
  }

  if (isDelete) {
    return <div>
     <DeletePage func={resetback} />
    </div>;
  }
  
  else {
    return (
      <div>
        <div className="w-full h-auto overflow-x-hidden overflow-y-auto mt-[4rem]">
          <div className=" w-[43%] m-auto flex flex-col">
            <div
              className="text-white text-[3.5rem] font-normal border-b "
              style={{ borderBottomColor: "#232323" }}
            >
              Edit Profile
            </div>
            <div className="flex mt-6">
              <img
                src="/images/default-green.png"
                className=" h-32 object-contain"
              />
              <div className=" ml-6 flex flex-col ">
                <input
                  placeholder="Name"
                  className="bg-[#666666] px-2 py-2 text-white outline-none font-normal text-lg placeholder:text-[#CCCCCC] placeholder:pl-2"
                />
                <Headings heading="Languages" />
                <div className="mt-1">
                  <select
                    name="language"
                    id="language"
                    className="outline-none px-3 py-1 bg-black text-white border text-sm border-white hover:bg-[rgb(45,45,45)]"
                  >
                    <option selected value="English">
                      English
                    </option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                    <option value="Dutch">Dutch</option>
                  </select>
                </div>
                <Headings heading="Game Handle" />
                <span className="text-white mt-4 text-sm font-normal">
                  Your handle is a unique name that will be used for playing with
                  other Netflix members across all Netflix games.
                </span>
                <input
                  placeholder="Create Game Handle"
                  className="bg-[#666666] mt-4 px-2 py-2 text-white outline-none font-normal text-lg placeholder:text-[#CCCCCC] placeholder:pl-2"
                />
                <hr className="border-1 h-px bg-[#232323] mt-10 border-transparent" />
                <Headings heading="Maturity Settings" />
                <span className="text-white text-sm mt-3 bg-[rgb(45,45,45)] py-2 px-4 w-max font-semibold">
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
                <AutoPlayText text="Autoplay next episodes in series for all devices." />
                <AutoPlayText text="Autoplay previews while browsing on all devices." />
              </div>
            </div>
            <hr className="border-1 h-px bg-[#232323] mt-8 border-transparent" />
            <div className="flex mt-8 items-center gap-4 mb-10">
              <button className="w-max px-6 py-1 bg-white hover:bg-[#e50914] hover:text-white font-semibold text-[1.25rem]">
                Save
              </button>
              <div>
                <Profilebuttons text="Cancel" />
              </div>
              <div onClick={toggleDelete}>
                <Profilebuttons text="Delete Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Manage;
