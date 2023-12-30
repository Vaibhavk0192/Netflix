import React from "react";
interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}
const InputEmail: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type,
}) => {
  return (
    <div className="relative sm: mx-10">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="
    flex 
    rounded-md
    lg:px-6
    lg:py-6
    lg:pb-1
    lg:mb-0
    lg:w-96
    text-md md:py-6
    text-white
    bg-black
    bg-opacity-50
    appearance-none
    boder-solid border-neutral-600 border-2
    focus:outline-white focus:outline-1
    focus:ring-0
    peer
    sm: px-5 py-7 text-md pb-3 w-full h-12 text-[1rem]
    "
        placeholder=" "
      />
      <label
        className=" absolute text-md text-zinc-400 duration-150
      transform
      -translate-y-3
      scale-75
      top-4
      z-10
      origin-[0]
      left-6
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default InputEmail;
