"use client";
import GetStarted from "@/components/GetStarted";
import InputEmail from "@/components/inputEmail";
import React from "react";
import {useRouter} from "next/navigation"

interface MainBannerProps {
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainBanner: React.FC<MainBannerProps> = ({ email, handleEmail }) => {
  const router=useRouter()
  return (
    <div className="">
      <div className="relative lg:h-[100vh] w-full bg-[url('/images/banner.jpg')] bg-no-repeat bg-fixed bg-cover ">
        <div className=" w-full h-full bg-opacity-70 bg-black ">
          <nav className="flex justify-between lg:px-14 w-full  lg:py-6 sm:px-4  sm:py-4 max-sm:px-2 max-sm:py-4">
            <img src="/images/logo.png" alt="logo" className=" lg:h-10 max-sm:h-6 sm:h-10" />
            <button className="bg-[#e50914] lg:w-20 max-sm:w-12 sm:h-8 sm:w-20 max-sm:h-6 rounded text-white lg:text-sm font-bold  max-sm:text-xs" onClick={()=>{
              router.push("/auth")
            }}>
              Sign In
            </button>
          </nav>
          <div className="text-white gap-5 flex align-middle justify-center text-center items-center self-center flex-col sm:h-[35rem] max-sm:h-[24rem]">
            <div className=" text-white font-black lg:text-5xl flex align-middle sm: text-3xl max-sm:text-xl sm:px-5 max-sm:px-4">
              Enjoy big movies, hit series and more from ₹149.
            </div>
            <div className="lg:text-2xl sm:mt-2 max-sm:mt-1 font-medium sm: text-lg px-5 ">
              Join today. Cancel anytime.
            </div>
            <div className="lg:text-lg sm:mt-2 max-sm:mt-1 sm: px-14 sm:text-base max-sm:text-xs ">
              Ready to watch? Enter your email to create or restart your
              membership.
            </div>
            <form className="flex flex-row flex-wrap justify-center items-center gap-2 ">
              <InputEmail
                label="Email address"
                onChange={handleEmail}
                id="email"
                type="email"
                value={email}
              />
              <GetStarted email={email}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
