"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "sonner";

type BookmarkPostProps = {
  postId: string;
  bookMarked: boolean;
};

export default function BookmarkPost({
  postId,
  bookMarked,
}: BookmarkPostProps) {
  const router = useRouter();

  const [bookmarked, setBookmarked] = useState(bookMarked);
  const [loading, setLoading] = useState(false);

  async function handleBookmark() {
    if (loading) return;

    setLoading(true);

    const wasBookmarked = bookmarked;
    setBookmarked(!wasBookmarked);

    try {
      const res = await fetch("/api/bookmarkPost", {
        method: "PUT",
        body: JSON.stringify({
          postId,
        }),
      });

      if (!res.ok) {
        setBookmarked(wasBookmarked);
        toast.error("Something went wrong");
        return;
      }

      toast.success(
        wasBookmarked
          ? "Deleted from Bookmarks"
          : "Added to Bookmarks",{duration:1000}
      );

      router.refresh();
    } catch {
      setBookmarked(wasBookmarked);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        onClick={handleBookmark}
        className="cursor-pointer disabled:opacity-50"
      >
        {bookmarked ? (
          <FaBookmark className="text-white" />
        ) : (
          <FaRegBookmark className="text-white" />
        )}
      </button>
    </div>
  );
}