"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import { HiEllipsisVertical } from "react-icons/hi2";
import LikeComment from "../LikeComment/LikeComment";
import { useSession } from "next-auth/react";
import CreateComment from "../CreateComment/CreateComment";
import DeleteComment from "../DeleteComment/DeleteComment";
import UpdateComment from "../UpdateComment/UpdateComment";
import CommentReplies from "../CommentReplies/CommentReplies";
import CreateReply from "../CreateReply/CreateReply";

type PostProps = {
  postId: string;
  commentsCount?: number;
  isInline?: boolean; 
};

function CommentsPost({ postId, commentsCount, isInline = false }: PostProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [open, setOpen] = useState(isInline); // يفتح تلقائي لو isInline
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  async function getComments() {
    const res = await fetch(`/api/getComments?postId=${postId}`);
    const data = await res.json();
    setComments(data.data.comments);
    setOpen(true);
    console.log(data);
  }

  
  useEffect(() => {
    if (isInline) {
      getComments();
    }
  }, [isInline, postId]);

  function handleUpdateLike(commentId: string) {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment._id === commentId) {
          const alreadyLiked = comment.likes.includes(
            session?.user._id
          );
          return {
            ...comment,
            likes: alreadyLiked
              ? comment.likes.filter(
                  (id: string) => id !== session?.user._id
                )
              : [...comment.likes, session?.user._id],
          };
        }
        return comment;
      })
    );
  }

  return (
    <>
      
      {!isInline && (
        <div className="flex items-center gap-2">
          <button onClick={getComments} className="cursor-pointer text-white transition-colors">
            <FaRegComment size={18} />
          </button>
          <span className="text-sm font-medium text-zinc-300">{commentsCount}</span>
        </div>
      )}

      {open && (
        <div className={isInline ? "w-full mt-4" : "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"}>
          <div className={`w-full max-w-xl rounded-xl bg-[#18181b] border border-zinc-800 p-5 text-white flex flex-col shadow-2xl ${isInline ? "" : "h-[80vh] animate-in fade-in zoom-in-95 duration-150"}`}>

            <div className="mb-4 flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-lg font-bold flex items-center gap-2">
                Comments 
                <span className="text-xs font-normal text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-full">
                  {comments.length}
                </span>
              </h2>
              
              {!isInline && (
                <button
                  onClick={() => {
                    setOpen(false);
                    setActiveDropdownId(null);
                    setEditingCommentId(null);
                  }}
                  className="text-xl font-light cursor-pointer text-zinc-400 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
              {comments.length > 0 ? (
                comments.map((comment: any) => {
                  const isLiked = comment.likes.includes(
                    session?.user._id
                  );
                  const isMyComment =
                    comment.commentCreator?._id === session?.user._id;
                  const isDropdownOpen = activeDropdownId === comment._id;
                  const isEditing = editingCommentId === comment._id;

                  return (
                    <div key={comment._id} className="flex flex-col border-b border-zinc-800/40 pb-4 last:border-0 last:pb-0">
                     
                      <div className="flex items-start gap-3">
                        <Image
                          src={comment.commentCreator?.photo}
                          className="rounded-full w-10 h-10 object-cover mt-0.5 shrink-0"
                          alt="user comment"
                          width={38}
                          height={38}
                        />

                        <div className="flex-1 bg-[#202023] rounded-xl border border-zinc-800/60 p-3 relative group">
                          
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-sm text-zinc-200">
                                {comment.commentCreator?.name}
                              </p>
                              <span className="text-zinc-500 text-[10px]">
                                {new Date(comment.createdAt).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>

                            {isMyComment && (
                              <div className="relative shrink-0">
                                <button
                                  onClick={() =>
                                    setActiveDropdownId(isDropdownOpen ? null : comment._id)
                                  }
                                  className="p-1 rounded-lg hover:bg-zinc-800/80 transition-colors cursor-pointer text-zinc-400 hover:text-white"
                                >
                                  <HiEllipsisVertical size={18} />
                                </button>

                                {isDropdownOpen && (
                                  <div className="absolute right-0 mt-1 w-28 rounded-lg border border-zinc-700 bg-[#1e1e1e] shadow-xl z-20 py-1 overflow-hidden">
                                    <button
                                      onClick={() => {
                                        setEditingCommentId(comment._id);
                                        setActiveDropdownId(null);
                                      }}
                                      className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                                    >
                                      Edit
                                    </button>
                                    <div className="border-t border-zinc-800/60">
                                      <DeleteComment
                                        onCommentCreated={() => {
                                          getComments();
                                          setActiveDropdownId(null);
                                        }}
                                        postId={comment.post}
                                        commentId={comment._id}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {!isEditing && (
                            <p className="mt-1.5 text-zinc-300 text-sm font-light leading-relaxed wrap-break-word">
                              {comment.content} 
                              {comment.image &&<Image className="mt-2" alt="comment image" src={comment.image} width={200} height={100}/>
}
                            </p>
                          )}

                          <UpdateComment
                            onCommentUpdated={() => {
                              getComments();
                              setEditingCommentId(null);
                            }}
                            content={comment.content}
                            postId={comment.post}
                            commentId={comment._id}
                            open={isEditing}
                            setOpen={(isOpen) => setEditingCommentId(isOpen ? comment._id : null)}
                          />

                          <div className="flex items-center gap-1.5 mt-2 pt-1 border-t border-zinc-800/40 w-fit">
                            <LikeComment
                              postId={comment.post}
                              commentId={comment._id}
                              isLiked={isLiked}
                              onUpdateLike={handleUpdateLike}
                            />
                            <span className="text-xs text-zinc-500 font-medium">
                              {comment.likes?.length || 0}
                            </span>
                          </div>

                        </div>
                      </div>

                      <div className="pl-12.5 mt-2 flex flex-col gap-2 w-full">
                        <CommentReplies 
                          repliesCount={comment.repliesCount} 
                          postId={comment.post}
                          commentId={comment._id} 
                        />
                        <CreateReply 
                          onCommentCreated={getComments} 
                          postId={comment.post}
                          commentId={comment._id} 
                        />
                      </div>
                      
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-zinc-500 text-sm py-12">
                  No Comments Yet
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800">
              <CreateComment
                onCommentCreated={getComments}
                postId={postId}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentsPost;