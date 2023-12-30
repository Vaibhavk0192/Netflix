
import { signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { TbArrowAutofitRight } from "react-icons/tb";

interface AccountMenuProps{
    visible?:boolean
}

const AccountMenu:React.FC<AccountMenuProps> = ({visible}) => {
    const { data: session, status } = useSession()

    if(!visible){
        return null;
    }
    return ( 
    <div className="bg-black w-52 absolute top-14 right-0 py-5 flex-col border-gray-800 flex rounded-md">
        <div className="flex flex-col gap-3">
            {/* group/item targets the multiple groups inside an group */}
            <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
                <img className=" w-8 rounded-md" src="/images/default-blue.png" alt=" "/>
                <p className="text-white text-sm group-hover/item:underline">{session?.user?.name}</p>
            </div>
            <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
            <FaPencilAlt size={25} className="text-gray-500 mr-2" />
                <p className="text-white text-sm group-hover/item:underline">Manage Profiles</p>
            </div>
            <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
            <TbArrowAutofitRight size={33} className="text-gray-500 " />
                <p className="text-white text-sm group-hover/item:underline">Transfer Profile</p>
            </div>
            <div className=" px-3 group/item flex flex-row gap-3 items-center w-full ">
            <MdOutlinePerson size={35} className="text-gray-500 " />
                <p className="text-white text-sm group-hover/item:underline">Account</p>
            </div>
            <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
            <BiHelpCircle size={35} className="text-gray-500 " />
                <p className="text-white text-sm group-hover/item:underline">Help Center</p>
            </div>
            
            <hr className="bg-gray-600 border-0 h-px my-2"/>

            <div onClick={()=>signOut()} className="px-3 text-center text-white text-sm hover:underline">
                Sign Out of Netflix
            </div>
        </div>
    </div> 
    );
}
 
export default AccountMenu;