"use client";

import MainBanner from "@/components/MainBanner";
import { ChangeEvent, useEffect, useState } from "react";

const Landing = () => {
  const [email, setEmail] = useState("");
  const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <MainBanner email={email} handleEmail={handleSetEmail} />
    </>
  );
};

export default Landing;
