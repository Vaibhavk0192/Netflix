interface profilebuttonprops{
    text:string;
}
const ProfileButton:React.FC<profilebuttonprops>= ({text}) => {
    return ( <button className="text-[#8f8e8e] border border-[#8f8e8e] w-max px-6 py-1 text-[1.25rem] hover:text-white hover:border-white">
    {text}
  </button> );
}
 
export default ProfileButton;