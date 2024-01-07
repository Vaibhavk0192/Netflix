import Profilebuttons from "@/components/Profile manage page/profileButtons";


interface DeleteProps{
    func:string
}
const DeletePage:React.FC<DeleteProps> = ({func}) => {
    
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col m-auto mt-36 w-[35%]">
        <div
          className="text-white text-[3.5rem] font-normal border-b "
          style={{ borderBottomColor: "#232323" }}
        >
          Delete Profile?
        </div>
        <div className="flex py-6">
          <div className="flex flex-col">
            <img
              src="/images/default-green.png"
              className="w-44 h-32 rounded-md"
            />
            <span className="text-[#666666] mt-4 text-[1.25rem] text-center ">
              name
            </span>
          </div>
          <div className="text-left text-white ml-6 w-full flex items-center font-medium text-base">
            This profile's history – including My List, ratings and activity –
            will be gone forever, and you will not be able to access it again.
          </div>
        </div>
        <hr className="border-1 h-px bg-[#232323] mt-5 border-transparent" />
        <div className="flex gap-4 mt-8">
          <button onClick={func} className="w-max px-6 py-1 bg-white hover:bg-[#e50914] hover:text-white font-semibold text-[1.25rem]">
            Keep Profile
          </button>
          <div >
            <Profilebuttons text="Delete Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
