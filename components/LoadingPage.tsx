"use client";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-full justify-center absolute flex items-center">
      <ColorRing
        colors={["#dc2626", "#dc2626", "#dc2626", "#dc2626", "#dc2626"]}
      />
    </div>
  );
};

export default Loading;
