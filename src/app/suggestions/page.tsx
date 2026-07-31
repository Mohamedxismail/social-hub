import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import FollowUser from "../_components/FollowUser/FollowUser";
import { UserPlus } from "lucide-react";

type UserProps = {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  isFollowing: boolean;
  followersCount: number;
};

export default async function ConnectPage() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/followSuggestions`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  const datas = await res.json();
  const suggestions = datas?.data?.suggestions || [];

  return (
    <div className="max-w-xl mx-auto   md:mb-10 mb-24   px-3 sm:px-4 space-y-4 ">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex  items-center gap-5 shadow-lg">
        <div className="bg-slate-800 border border-slate-700 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
          <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-slate-200" />
        </div>

        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-white">
            Suggested Accounts
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discover new people to follow and grow your network.
          </p>

          <span className="inline-flex mt-2 sm:mt-3 items-center rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-slate-300">
            {suggestions.length} Suggestions
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-6 shadow-lg">
        <div className="divide-y divide-slate-800">
          {suggestions.map((user: UserProps) => (
            <div
              key={user._id}
              className="group flex items-center justify-between gap-3 sm:gap-4 rounded-xl px-2 sm:px-3 py-3 transition-colors duration-200 hover:bg-slate-800/70"
            >
              <Link
                href={`/profile/${user._id}`}
                className="flex flex-1 min-w-0 items-center gap-3 sm:gap-4"
              >
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                  <Image
                    src={user.photo || "/default-avatar.png"}
                    alt={user.name || "User profile"}
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="rounded-full border-2 border-slate-700 object-cover transition-colors group-hover:border-slate-500"
                  />
                </div>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm sm:text-base font-semibold text-white transition-colors group-hover:text-slate-200">
                    {user.name}
                  </h3>

                  {user.username && (
                    <p className="truncate text-xs sm:text-sm text-slate-400">
                      @{user.username}
                    </p>
                  )}

                  {user.mutualFollowersCount > 0 ? (
                    <p className="mt-0.5 sm:mt-1 truncate text-[11px] sm:text-xs text-slate-500">
                      {user.mutualFollowersCount} Mutual Friend
                      {user.mutualFollowersCount > 1 ? "s" : ""}
                    </p>
                  ) : (
                    <p className="mt-0.5 sm:mt-1 truncate text-[11px] sm:text-xs text-slate-500">
                      {user.followersCount} Followers
                    </p>
                  )}
                </div>
              </Link>

              <div className="shrink-0">
                <FollowUser
                  userId={user._id}
                  isFollowing={user.isFollowing ?? false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}