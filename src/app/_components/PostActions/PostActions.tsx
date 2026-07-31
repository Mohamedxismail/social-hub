"use client";

import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import UpdatePost from "../UpdatePost/UpdatePost";
import DeletePost from "../DeletePost/DeletePost";

type Props = {
    postId: string;
    postContent: string;
    postImage?: string;
};

export default function PostActions({
    postId,
    postContent,
    postImage,
}: Props) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setOpen(!open)}>
                <HiDotsVertical className="cursor-pointer" size={20} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-35 rounded-lg bg-slate-800 shadow-lg border border-slate-700 p-2 z-50">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <UpdatePost
                                postId={postId}
                                postContent={postContent}
                                postImage={postImage}
                            />
                        </div>
                        <div>
                            <DeletePost postId={postId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}