"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserPlus } from "lucide-react";

type UserProps = {
  userId: string;
  isFollowing: boolean;
};

export default function FollowUser({
  userId,
  isFollowing,
}: UserProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  async function handleFollow() {
    if (loading) return;

    setLoading(true);
    setFollowing((prev) => !prev);

    try {
      const res = await fetch(`/api/followUser?userId=${userId}`, {
        method: "PUT",
      });

      if (!res.ok) {
        setFollowing((prev) => !prev);
      }

      router.refresh();
    } catch {
      setFollowing((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleFollow}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      } ${
        following
          ? "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800"
          : "bg-blue-600 text-white hover:bg-blue-500"
      }`}
    >
      {loading ? (
        "Loading"
      ) : following ? (
        <>
          
          Following
        </>
      ) : (
        <>
          <UserPlus size={16} />
          Follow
        </>
      )}
    </button>
  );
}