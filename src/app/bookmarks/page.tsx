import { getMyToken } from "@/utilities/token";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaBookmark, FaHome } from "react-icons/fa";
import PostCard from "../_components/PostCard.tsx/PostCard";
import { GoBookmarkSlashFill } from "react-icons/go";

type DecodedToken = {
  token: string;
  user: {
    _id: string;
  };
};

async function BookMarks() {
  const cookieStore = await cookies();
  const tokenv = (await getMyToken()) as DecodedToken;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getBookMarks`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();
  const bookmarkpost = data?.data?.bookmarks || [];

  return (
    <div className="flex flex-col gap-6  md:mb-5 mb-24 max-w-2xl mx-auto px-4 text-white min-h-screen font-sans">
      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 relative overflow-hidden flex items-center gap-5 shadow-xl backdrop-blur-sm">
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center justify-center shrink-0">
          <FaBookmark className="md:text-3xl text-2xl text-slate-200" />
        </div>

        <div className="flex flex-col gap-1 z-10">
          <h1 className="md:text-2xl text-xl font-bold text-white tracking-tight">
            Your Bookmarks
          </h1>
          <p className="text-gray-400 md:text-md text-sm">
            Keep your favorite posts saved and access them anytime.
          </p>
          <span className="text-slate-200 font-medium text-md mt-1">
            {bookmarkpost.length} saved {bookmarkpost.length === 1 ? "post" : "posts"}
          </span>
        </div>

        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {bookmarkpost.length === 0 ? (
        <div className="bg-[#111827]/80  rounded-3xl p-12 flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-sm">
          <div className="bg-slate-800 text-blue-500 border border-blue-500/20 p-4 rounded-2xl flex items-center justify-center mb-5">

            <GoBookmarkSlashFill className="md:text-3xl text-2xl text-slate-200" />

          </div>

          <h2 className="md:text-2xl text-xl font-bold text-white mb-2">
            No saved posts yet
          </h2>
          <p className="text-gray-400 text-md max-w-xs mb-6">
            When you bookmark a post, it will appear here.
          </p>

          <Link
            href="/"
            className="bg-blue-600/20 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 text-md "
          >
            <FaHome className="text-base" />
            Back Home
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookmarkpost.map((postMarked: React.ComponentProps<typeof PostCard>["post"]) => (
            <PostCard
              key={postMarked._id || postMarked.id}
              post={postMarked}
              userId={tokenv?.user?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookMarks;