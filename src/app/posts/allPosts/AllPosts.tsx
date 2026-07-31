import { getMyToken } from "@/utilities/token";
import Image from "next/image";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import LikePost from "@/app/_components/PostActions/LikePost/LikePost";
import BookmarkPost from "@/app/_components/PostActions/bookmarkPost/BookmarkPost";
import CommentsPost from "@/app/_components/CommentsPost/CommentsPost";

 type DecodedToken = {
  token: string;
  user: {
    _id: string;
    
  };
};
async function AllPosts() {
    const tokenv = await getMyToken() as DecodedToken;
    const token = tokenv?.token

    const res = await fetch("https://route-posts.routemisr.com/posts", {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    const posts = data.data.posts
    console.log(data.data.posts)
    
    return (
        <div className="flex flex-col gap-2 mb-3 justify-center mt-7">
            {posts.map((post: any, idx: number) => {
                const isLiked = post.likes.includes(tokenv?.user?._id)
                const bookmarked = post.bookmarked
                return (
                    <div key={idx} className="bg-transparent border-2 border-gray-700 text-white p-4 rounded-lg">
                        <div className=" flex justify-between items-center">
                            <div className="flex  items-center gap-3 ">
                                <Image className="rounded-full" src={post?.user?.photo} alt="profileUser" width={50} height={50} />
                                <div className="flex-col justify-center ">
                                    <p className="font-bold text-xl">{post?.user?.name}</p>
                                    <span className="text-gray-400"> {new Date(post.createdAt).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="text-white">
                            <div className="ms-1 mt-3 mb-3 text-lg" dir="auto">
                                {post.body}
                                  
                            </div>
                            <div>
                                {post.image && <Image src={post.image} alt="post Image" width={610} height={610} />}
                            </div>

                        </div>
                        {post?.sharedPost && <div className="text-white border-2 border-gray-700 rounded-lg  mt-4 p-3">
                            <div className=" flex justify-between items-center">
                                <div className="flex  items-center gap-3 ">
                                    <Image className="rounded-full" priority src={post?.sharedPost?.user?.photo} alt="profileUser" width={50} height={50} />
                                    <div className="flex-col justify-center ">
                                        <p className="font-bold">{post?.sharedPost?.user?.name}</p>
                                        <span className="text-gray-400"> {new Date(post?.sharedPost?.createdAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}</span>
                                    </div>
                                </div>
                              
                            </div>
                            <div className="ms-1 mt-3 mb-2 text-lg" dir="auto">
                                {post?.sharedPost?.body}
                            </div>

                            <div className="">
                                {post?.sharedPost?.image && <Image src={post.sharedPost.image} priority alt="post Shared" width={610} height={610} />}

                            </div>

                        </div>}
                       
                        <div className=" mt-5 flex text-md justify-between  gap-4">
                            <div className="flex justify-start gap-4">
                                <div className=" flex  items-center gap-2">
                                <LikePost postId={post.id} isLiked={isLiked}/>
                                <span>{post.likesCount}</span>
                            </div>
                            <div className=" flex  items-center gap-2">
                              <CommentsPost />
                               <FaRegComment />
                                <span>{post.commentsCount}</span>
                            </div>
                            <div className=" flex  items-center gap-2">
                                <PiShareFat />
                                <span>{post.sharesCount}</span>
                            </div>
                            </div>
                            <div className="flex  items-center">
                                <BookmarkPost postId={post.id} bookMarked={bookmarked}/>
                                    
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllPosts
