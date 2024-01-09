"use client";
import { ColorRing } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full h-full justify-center absolute flex items-center">
      <ColorRing
        colors={["#dc2626", "#dc2626", "#dc2626", "#dc2626", "#dc2626"]}
      />
    </div>
  );
}
