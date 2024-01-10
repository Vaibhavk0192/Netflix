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
    <div className="relative  justify-center items-center  ">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="
        self-center justify-center
        w-96
        h-14
        max-sm:w-[20rem]
    flex px-6
    rounded-md
    text-white
    bg-black
    bg-opacity-50
    appearance-none
    boder-solid border-neutral-600 border-2
    focus:outline-white focus:outline-1
    focus:ring-0
    peer
   text-md max-sm:h-10 max-sm:text-[0.8rem] max-sm:pt-3
    "
        placeholder=" "
      />
      <label
        className=" absolute lg:mb-5 sm:text-md max-sm:text-[0.7rem] text-zinc-400 duration-150
      transform
      sm:-translate-y-3
      scale-75
      sm:top-4
      max-sm:top-3
      z-10
      origin-[0]
      left-6
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      max-sm:peer-focus:-translate-y-2

      "
      
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default InputEmail;
