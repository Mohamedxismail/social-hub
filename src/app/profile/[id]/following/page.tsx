import FollowersList from "@/app/_components/FollowerList/FollowerList";
import { getUserProfile } from "@/services/profile";
import Link from "next/link";
import { FaUsers, FaArrowLeft } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const FollowingPage = async ({ params }: Props) => {
    const { id } = await params;
    const { data } = await getUserProfile(id);
    const following = data?.user?.following || [];

    return (
        <div className="max-w-2xl px-4 mb-24  py-2 text-white min-h-screen">
            
            <div className="mb-8 border-b border-gray-800 pb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Link 
                        href={`/profile/${id}`} 
                        className="p-2.5 rounded-full hover:bg-gray-800/80 transition-colors text-gray-300 hover:text-white"
                        aria-label="Back to profile"
                    >
                        <FaArrowLeft className="text-lg" />
                    </Link>
                    <div className="flex justify-center items-center">
                        <div >
                            <IoPersonAdd className="text-2xl" />
                        </div>
                        <div className="flex flex-col ms-3">
                            <h1 className="text-2xl font-bold tracking-tight">Following</h1>
                        <p className="text-sm text-gray-400">Accounts this user follows.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-400 font-medium">
                    <span className="text-white font-bold text-base">{following.length} following</span> 
                    
                </div>
            </div>

            <div>
                {following.length === 0 ? (
                    <div className="mt-12 py-16 px-4 flex flex-col justify-center items-center gap-3 border border-dashed border-gray-800 rounded-2xl bg-gray-950/50 text-center">
                        <div className="p-4 bg-gray-900/80 rounded-full text-gray-400 mb-2">
                            <FaUsers className="text-4xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-200">No following yet</h2>
                        <p className="font-normal text-sm text-gray-400 max-w-sm">
                            When people start following this account, they will show up here.
                        </p>
                    </div>
                ) : (
                    <div>
                       <FollowersList followers={following}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowingPage;