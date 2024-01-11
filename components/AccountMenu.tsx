import { signOut } from "next-auth/react";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { TbArrowAutofitRight } from "react-icons/tb";
import AccountProfile from "./AccountProfile";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  visible?: boolean;
  profileData: {
    id: string;
    name: string;
    imageUrl: string;
    favourites: string[];
    likedMovies: string[];
    userId: string;
  }[];
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, profileData }) => {
  const router = useRouter();

  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-52 max-sm:w-44 absolute top-10 right-0 py-5 flex-col border-gray-800 flex rounded-md">
      <div className="flex flex-col gap-3 max-sm:gap-1.5 text-sm max-sm:text-xs">
        {profileData.map((i: any) => (
          <AccountProfile
            key={i.id}
            id={i.id}
            name={i.name}
            image={i.imageUrl}
          />
        ))}

        <div
          className=" px-3 group/item flex flex-row gap-3 items-center w-full"
          onClick={() => {
            router.back();
          }}
        >
          <FaPencilAlt size={25} className="text-gray-500 mr-2" />
          <p className="text-white  group-hover/item:underline">
            Manage Profiles
          </p>
        </div>
        <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
          <TbArrowAutofitRight size={33} className="text-gray-500 " />
          <p className="text-white  group-hover/item:underline">
            Transfer Profile
          </p>
        </div>
        <div className=" px-3 group/item flex flex-row gap-3 items-center w-full ">
          <MdOutlinePerson size={35} className="text-gray-500 " />
          <p className="text-white  group-hover/item:underline">
            Account
          </p>
        </div>
        <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
          <BiHelpCircle size={35} className="text-gray-500 " />
          <p className="text-white  group-hover/item:underline">
            Help Center
          </p>
        </div>

        <hr className="bg-gray-600 border-0 h-px my-2" />

        <div
          onClick={() => signOut({callbackUrl:"/"})}  
          className="px-3 text-center text-white  hover:underline"
        >
          Sign Out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
