"use client"
import AccountMenu from "./AccountMenu"
import NavbarItem from "./NavbarItems"
import {BsChevronDown,BsSearch,BsBell} from "react-icons/bs"
import MobileMenu from "./MobileMenu";
import  {useState , useCallback,useEffect} from "react"

// how much the use is going o scroll down
const TOP_OFFSET=66;

const Navbar = () => {
  const [ShowMobileMenu, setShowMobileMenu] = useState(false)
  const [ShowAccountMenu, setShowAccountMenu] = useState(false)
  const [ShowBackground, setShowBackground] = useState(false)

  const toggleMobileMenu=useCallback(
    () => {
      setShowMobileMenu((current)=>!current)
    },
    [],
  )

  const toggleAccountMenu=useCallback(
    () => {
      setShowAccountMenu((current)=>!current)
    },
    [],
  )
  
  useEffect(() => {
    const handleScroll=()=>{
      if(window.scrollY>=TOP_OFFSET){
        setShowBackground(true);
      }else{
        setShowBackground(false);
      }
    }
    window.addEventListener("scroll",handleScroll);
    return ()=>{
      window.removeEventListener("scroll",handleScroll);
    }
  }, [])
  

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-4 py-6 flex flex-row items-center transition duration-500 ${ShowBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
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
            <BsChevronDown className={`text-white transition ${ShowMobileMenu ? "rotate-180":"rotate-0"}`}/>
            <MobileMenu visible={ShowMobileMenu}/>
        </div>
        <div className="flex flex-row ml-auto mr-4 gap-7 items-center">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                <BsSearch/>
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell/>
            </div>
            <div onClick={toggleAccountMenu} className="flex flex-row  gap-2 items-center cursor-pointer relative">
               <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-blue.png" alt=""/>
               </div>
               <BsChevronDown className={`text-white transition ${ShowAccountMenu ? "rotate-180":"rotate-0"}`}/>
               <AccountMenu visible={ShowAccountMenu}/>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
