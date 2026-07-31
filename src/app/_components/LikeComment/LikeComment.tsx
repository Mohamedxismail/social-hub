"use client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
type LikeCommentProps = {
  postId: string;
  commentId: string;
  isLiked: boolean;
  onUpdateLike: (commentId: string) => void;
};

export default function LikeComment({
  postId,
  commentId,
  isLiked,
  onUpdateLike,
}: LikeCommentProps) {
  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  async function handleLikeComment() {
    if (loading) return;
    setLoading(true);
    const wasLiked = liked;

    setLiked(!wasLiked);

    try {
      const res = await fetch("/api/likeComment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          commentId,
        }),
      });

      if (!res.ok) {
        setLiked(wasLiked);
        return;
      }
      onUpdateLike(commentId);
    } catch {
      setLiked(wasLiked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLikeComment}
      disabled={loading}
      className="cursor-pointer transition-transform active:scale-90 disabled:opacity-50"
    >
      {liked ? (
        <FaHeart className="text-red-500 text-sm transition-all duration-200 scale-110" />
      ) : (
        <FaRegHeart className="text-sm hover:text-red-400 transition-all duration-200" />
      )}
    </button>
  );
}