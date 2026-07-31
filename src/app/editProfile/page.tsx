import { FaCog } from "react-icons/fa";
import EditPhoto from "../_components/EditPhoto/EditPhoto";
import { getMyToken } from "@/utilities/token";
import { getUserProfile } from "@/services/profile";
import ChangePassword from "../_components/ChangePassword/ChangePassword";
type DecodedToken = {
  token: string;
  user: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
};
export default async function SettingsPage() {
  const tokenv = (await getMyToken()) as DecodedToken;
  const { data } = await getUserProfile(tokenv!.user._id);

  return (
    <div className="flex flex-col gap-6  max-w-2xl px-4 text-white min-h-screen font-sans md:mb-8 mb-20">
      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 relative overflow-hidden flex items-center gap-5 shadow-xl backdrop-blur-sm">
        <div className="bg-slate-800 text-blue-500 border border-slate-700 p-4 rounded-2xl flex items-center justify-center">
          <FaCog className="text-3xl text-slate-200" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-400">
            Manage your profile, security and account preferences.
          </p>
        </div>
      </div>

      <EditPhoto user={data.user} />
      <ChangePassword/>

    </div>
  );
}