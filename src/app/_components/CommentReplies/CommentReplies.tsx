"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react"; 

type CommentsRepliesProps = {
  postId: string;
  commentId: string;
  repliesCount: number;
};

type CommentCreator = {
  _id: string;
  name: string;
  photo: string;
};

type ReplyItem = {
  _id: string;
  content: string;
  createdAt: string;
  commentCreator: CommentCreator;
  image?: string;
};

function CommentReplies({ postId, commentId, repliesCount }: CommentsRepliesProps) {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<ReplyItem[]>([]);
  
  const prevCountRef = useRef(repliesCount);

  async function fetchRepliesData() {
    const res = await fetch(
      `/api/commentReplies?postId=${postId}&commentId=${commentId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    setReplies(data.data.replies);
  }

  async function handleReplies() {
    if (!open) {
      await fetchRepliesData();
    }
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    if (repliesCount > prevCountRef.current) {
      fetchRepliesData(); 
      setOpen(true);      
    }
    prevCountRef.current = repliesCount;
  }, [repliesCount]);

  return (
    <div className="w-full">
      {repliesCount > 0 ? (
        <button 
          className="text-xs text-zinc-400 hover:text-zinc-200 font-medium cursor-pointer transition-colors flex items-center gap-1" 
          onClick={handleReplies}
        >
          {open ? "Hide Replies" : `Show Replies (${repliesCount})`}
        </button>
      ) : null}

      {open && (
        <div className="mt-3 pl-4 border-l-2 border-zinc-800 space-y-3">
          {replies.length > 0 ? (
            replies.map((reply: ReplyItem) => (
              <div key={reply._id} className="flex items-start gap-3 bg-[#1a1a1a]/40 p-2.5 rounded-lg border border-zinc-800/40" >
                <Image 
                  src={reply.commentCreator?.photo} 
                  alt="user Comment" 
                  className="rounded-full object-cover mt-0.5" 
                  width={32} 
                  height={32} 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-xs font-semibold text-gray-200 truncate">
                      {reply.commentCreator?.name}
                    </h2>
                    <span className="text-[10px] text-zinc-500 shrink-0">
                      {new Date(reply.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-300 font-light leading-relaxed wrap-break-word">
                    {reply.content}
                    {reply.image && <Image className="mt-3 mb-3" src={reply.image} alt="image reply" width={200} height={100}/>}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-500 pl-2">No Replies Yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentReplies;