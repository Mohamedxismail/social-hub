"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type LikePostProps = {
  postId: string;
  isLiked: boolean;
  likesCount:number
};

export default function LikePost({
  postId,
  isLiked,
  likesCount
}: LikePostProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(likesCount);

  async function handleLike() {
    if (loading) return;
    setLoading(true);
    const wasLiked = liked;
    setLiked(!wasLiked);
    setCount(prev=>(wasLiked? prev -1 :prev +1))

    try {
      const res = await fetch("/api/likePost", {
        method: "PUT",
        body: JSON.stringify({ postId }),
      });
      if (!res.ok) {
        setLiked(wasLiked);
        setCount(prev => (wasLiked ? prev + 1 : prev - 1));
        return;
      }
      router.refresh();
    } catch {
      setLiked(wasLiked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <button
      onClick={handleLike}
      disabled={loading}
      className="cursor-pointer transition-transform active:scale-90"
    >
      {liked ? (
        <FaHeart className="text-red-500 text-lg transition-all duration-200" />
      ) : (
        <FaRegHeart className="text-white text-lg hover:text-red-400 transition-all duration-200" />
      )}
    </button>
    <span>{count}</span>
    </>
  );
}