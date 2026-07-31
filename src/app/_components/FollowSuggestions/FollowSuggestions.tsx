import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import FollowUser from "../FollowUser/FollowUser";

type UserProps = {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  isFollowing: boolean;
};

export default async function FollowSuggestions() {
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
  if (!suggestions.length) return null;

  return (
    <aside className="hidden lg:block sticky top-20 h-fit w-90 shrink-0 p-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Suggestions
          </h2>

          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300">
            {suggestions.length} Suggest
          </span>
        </div>

        <div className="space-y-2">
          {suggestions.slice(0, 5).map((user: UserProps) => (
            <div
              key={user._id}
              className="group flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-800/70"
            >
              <Link
                href={`/profile/${user._id}`}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={user.photo}
                    alt={user.name}
                    fill
                    sizes="40px"
                    className="rounded-full border border-slate-700 object-cover transition-colors group-hover:border-slate-500"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {user.name}
                  </h3>

                  {user.username && (
                    <p className="truncate text-xs text-slate-400">
                      @{user.username}
                    </p>
                  )}

                  {user.mutualFollowersCount > 0 && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {user.mutualFollowersCount} Mutual Friend
                    </p>
                  )}
                </div>
              </Link>

              <FollowUser
                userId={user._id}
                isFollowing={user.isFollowing ?? false}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-slate-800 pt-3">
          <Link
            href="/suggestions"
            className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            View All
          </Link>
        </div>
      </div>
    </aside>
  );
}