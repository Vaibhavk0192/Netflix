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
    sm:px-6
    sm:py-6
    sm:mb-0
    sm:w-96

    max-sm:px-6
    max-sm:py-2
     

    text-md
    text-white
    bg-black
    bg-opacity-50
    appearance-none
    boder-solid border-neutral-600 border-2
    focus:outline-white focus:outline-1
    focus:ring-0
    peer
   text-md w-full sm:h-12 max-sm:h-8 text-[1rem]
    "
        placeholder=" "
      />
      <label
        className=" absolute sm:text-md max-sm:text-xs text-zinc-400 duration-150
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
      peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default InputEmail;
