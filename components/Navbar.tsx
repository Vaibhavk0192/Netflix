"use client"
import NavbarItem from "./NavbarItems"
import {BsChevronDown,BsSearch,BsBell} from "react-icons/bs"
import MobileMenu from "./MobileMenu";
import {useState , useCallback} from "react"

const Navbar = () => {
  const [ShowMobileMenu, setShowMobileMenu] = useState(false)
  const toggleMobileMenu=useCallback(
    () => {
      setShowMobileMenu((current)=>!current)
    },
    [],
  )
  

  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-4 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home"/>
            <NavbarItem label="Series"/>
            <NavbarItem label="Movies"/>
            <NavbarItem label="New & Popular"/>
            <NavbarItem label="My List"/>
            <NavbarItem label="Browse by Languages"/>
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown className="text-white transition"/>
            <MobileMenu visible={ShowMobileMenu}/>
        </div>
        <div className="flex flex-row ml-auto mr-4 gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                <BsSearch/>
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell/>
            </div>
            <div className="flex flex-row  gap-2 items-center cursor-pointer relative">
               <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-blue.png" alt=""/>
               </div>
            </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
