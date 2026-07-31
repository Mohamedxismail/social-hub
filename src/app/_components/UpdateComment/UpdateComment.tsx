"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";

type CommentProps = {
    postId: string;
    commentId: string;
    content: string;
    onCommentUpdated: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
};

function UpdateComment({
    postId,
    commentId,
    content,
    onCommentUpdated,
    open,
    setOpen,
}: CommentProps) {
    const [updatedContent, setUpdatedContent] = useState(content);
            const[loadingApi,setLoadingApi] =useState(false)


    useEffect(() => {
        setUpdatedContent(content);
    }, [content]);

    async function handleUpdateComment() {
        if (!updatedContent.trim()) return;

        const formData = new FormData();
        formData.append("content", updatedContent);

        const res = await fetch(
            `/api/updateComment?postId=${postId}&commentId=${commentId}`,
            {
                method: "PUT",
                body: formData,
            }
            
        );
        setLoadingApi(true)

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            onCommentUpdated();
            setOpen(false);
            toast.success(data.message)
            setLoadingApi(false)
        }else {
            toast.warning(data.message)
        }
    }

    if (!open) return null;

    return (
        <div className="mt-3 w-full border-t border-gray-800 pt-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                    type="text"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    placeholder="Update Comment"
                    className="w-full rounded-lg border border-gray-700 bg-[#1e1e1e] p-2.5 text-sm text-white outline-none focus:border-blue-500"
                />

                <div className="flex gap-2 justify-end">
                    {loadingApi ? "saving" : <button  
                        onClick={handleUpdateComment}
                        className="rounded-lg bg-blue-600 px-4 py-2  text-xs font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        Save
                    </button>}
                   

                    <button
                        onClick={() => {
                            setUpdatedContent(content);
                            setOpen(false);
                        }}
                        className="rounded-lg bg-zinc-700 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-600 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateComment;