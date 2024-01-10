"use client";

import GetStarted from "@/components/GetStarted";
import Feature from "@/components/Landing Page/Feature4";
import FrequentQues from "@/components/Landing Page/FrequeuntQues";
import FooterHome from "@/components/Landing Page/footer";
import MainBanner from "@/components/MainBanner";
import InputEmail from "@/components/inputEmail";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const Landing = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <MainBanner email={email} handleEmail={handleSetEmail} />
      <Feature
        text1="Enjoy on your TV"
        text2="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more."
        image="/images/feature1.png"
      />
      <Feature
        text1="Download your shows to watch offline"
        text2="Save your favourites easily and always have something to watch."
        image="/images/feature2.jpg"
      />
      <Feature
        text1="Watch everywhere"
        text2="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
        image="/images/feature3.png"
      />
      <Feature
        text1="Create profiles for kids"
        text2="Send children on adventures with their favourite characters in a
              space made just for them—free with your membership."
        image="/images/feature4.png"
      />
      <FrequentQues />
      <div className="bg-[#000000] pb-10 flex flex-row flex-wrap justify-center items-center gap-2 pt-6">
        <InputEmail
          label="Email address"
          onChange={handleSetEmail}
          id="email"
          type="email"
          value={email}
        />
        <div
          onClick={() => {
            router.push("/auth");
          }}
        >
          <GetStarted email={email}/>
        </div>
      </div>
      <FooterHome />
    </>
  );
};

export default Landing;
