import Profilebuttons from "@/components/Profile manage page/profileButtons";
import useCurrentProfile from "@/hooks/useCurrentProfile";
import useProfiles from "@/hooks/useProfiles";
import { useRouter } from "next/navigation";

interface DeleteProps {
  func: any;
  name: string;
  image: string;
  profile: string;
}
const DeletePage: React.FC<DeleteProps> = ({ func, name, image, profile }) => {
  const router = useRouter();
  const { data: profileData, mutate } = useCurrentProfile(profile);
  const { data: profiles, mutate: mutateProfile } = useProfiles();
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteProfile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: profileData.id,
        }),
      });
      if (response) {
        const res = await response.json();
        console.log(res);
      }
      mutateProfile();
      router.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col m-auto mt-36 lg:w-[40%] md:w-[70%] sm:w-[70%] min-[440px]:w-[80%]">
        <div
          className="text-white sm:text-[3.5rem] font-normal border-b max-sm:text-[2.5rem]"
          style={{ borderBottomColor: "#232323" }}
        >
          Delete Profile?
        </div>
        <div className="flex py-6">
          <div className="flex flex-col">
            <img src={image} className="w-44 h-32 rounded-md" />
            <span className="text-[#666666] mt-4 text-[1.25rem] text-center ">
              {name}
            </span>
          </div>
          <div className="text-left text-white ml-6 w-full flex items-center font-medium text-base">
            This profile's history – including My List, ratings and activity –
            will be gone forever, and you will not be able to access it again.
          </div>
        </div>
        <hr className="border-1 h-px bg-[#232323] mt-5 border-transparent" />
        <div className="flex gap-4 mt-8">
          <button
            onClick={func}
            className="w-max px-6 py-1 bg-white hover:bg-[#e50914] hover:text-white font-semibold sm:text-[1.25rem] max-sm:text-[1rem] "
          >
            Keep Profile
          </button>
          <div onClick={handleDelete}>
            <Profilebuttons text="Delete Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
