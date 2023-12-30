"use client";
import GetStarted from "@/components/GetStarted";
import InputEmail from "@/components/inputEmail";
import React from "react";

interface MainBannerProps {
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainBanner: React.FC<MainBannerProps> = ({ email, handleEmail }) => {
  return (
    <div>
      <div className="relative h-full w-full bg-[url('/images/banner.jpg')] bg-no-repeat bg-fixed bg-cover ">
        <div className=" w-full h-full bg-opacity-70 bg-black ">
          <nav className="flex justify-between lg:px-44 w-full  lg:py-6 sm: px-4  sm: py-4">
            <img src="/images/logo.png" alt="logo" className=" h-10  " />
            <button className="bg-[#e50914] w-20 h-8 rounded text-white text-sm font-bold mt-1 mr-4">
              Sign In
            </button>
          </nav>
          <div className="text-white gap-5 flex align-middle justify-center text-center items-center self-center flex-col h-[35rem]">
            <div className=" text-white font-black lg:text-5xl flex align-middle sm: text-3xl px-5 ">
              Enjoy big movies, hit series and more from ₹149.
            </div>
            <div className="lg:text-2xl mt-2 font-medium sm: text-lg px-5 ">
              Join today. Cancel anytime.
            </div>
            <div className="lg:text-lg mt-2 sm: px-14 ">
              Ready to watch? Enter your email to create or restart your
              membership.
            </div>
            <form className="flex flex-row flex-wrap justify-center items-center gap-2">
              <InputEmail
                label="Email address"
                onChange={handleEmail}
                id="email"
                type="email"
                value={email}
              />
              <GetStarted />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
