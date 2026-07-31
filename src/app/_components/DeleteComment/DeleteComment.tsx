"use client"
import React, { useState } from 'react'
import { toast } from 'sonner';
type CommentId = {
    postId: string,
    commentId: string,
    onCommentCreated: () => void ;
}
function DeleteComment({ postId, commentId ,onCommentCreated }: CommentId) {
    const[loading,setLoading]=useState(false)

    async function handleDeleteComment() {
        setLoading(true)
        const res = await fetch(`/api/deleteComment?postId=${postId}&commentId=${commentId}`, {
            method: "DELETE"
        }
        )
        const data = await res.json()
        
        if (res.ok) {
            onCommentCreated()
            setLoading(false)
            toast.success(data.message)
            
        }else {
            toast.warning(data.message)
        }

    }
    return (
        <div>
            <button disabled={loading} className='cursor-pointer text-red-600 disabled:opacity-50 ms-3' onClick={handleDeleteComment}>
                {loading ? "Deleting" : "Delete"}
            </button>
        </div>
    )
}

export default DeleteComment
