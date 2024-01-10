"use client";

import { useRouter } from "next/navigation";

interface AccountProfileProps {
  name: string;
  image: string;
  id: string;
}
const AccountProfile: React.FC<AccountProfileProps> = ({ id, name, image }) => {
  const router = useRouter();
  return (
    <div
      className=" px-3 group/item flex flex-row gap-3 items-center w-full"
      onClick={() => {
        router.replace(`/in/${id}`);
      }}
    >
      <img className=" w-8 rounded-md" src={image} alt=" " />
      <p className="text-white text-sm group-hover/item:underline">{name}</p>
    </div>
  );
};

export default AccountProfile;
