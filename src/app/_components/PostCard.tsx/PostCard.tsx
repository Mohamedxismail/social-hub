import Image from "next/image";
import Link from "next/link";
import LikePost from "../PostActions/LikePost/LikePost";
import BookmarkPost from "../PostActions/bookmarkPost/BookmarkPost";
import CommentsPost from "../CommentsPost/CommentsPost";
import SharePost from "../sharePost/SharePost";
import DeletePost from "../DeletePost/DeletePost";
import UpdatePost from "../UpdatePost/UpdatePost";
import PostActions from "../PostActions/PostActions";

export interface PostUser {
  _id: string;
  name: string;
  photo: string;
}

export interface SharedPost {
  _id: string;
  body: string;
  image?: string;
  createdAt: string;
  user: PostUser;
}

export interface Post {
  id: string;
  body: string;
  image?: string;
  createdAt: string;
  user: PostUser;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  bookmarked: boolean;
  _id?: string;
  sharedPost?: SharedPost | null;
}

type PostCardProps = {
  post: Post;
  userId: string;
};

export default function PostCard({ post, userId }: PostCardProps) {
  const isLiked = post.likes.includes(userId);
  const bookmarked = post.bookmarked;
  const isMyPost = userId === post.user._id;

  return (
<div className="bg-[#121927] text-white rounded-2xl  p-3 sm:p-4 w-full max-w-full mb-2 shadow-lg border border-slate-800/60 font-sans">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.user._id}`} className="shrink-0">
            <Image
              className="rounded-full object-cover w-11 h-11 ring-1 ring-slate-700"
              src={post.user.photo || "/default-avatar.png"}
              alt="profileUser"
              width={50}
              height={50}
            />
          </Link>

          <div className="flex flex-col">
            <Link 
              href={`/profile/${post.user._id}`}
              className="font-bold text-[16px] text-white transition"
            >
              {post.user.name}
            </Link>
            
            <Link 
              href={`/singlePost/${post.id}`} 
              className="text-xs text-slate-400 hover:underline mt-0.5"
            >
              {new Date(post.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isMyPost && (
            <div className="flex flex-col justify-center items-center gap-1">
              <PostActions postId={post.id}
                postContent={post.body}
                postImage={post.image} />
             
            </div>
          )}
        </div>
      </div>

      {post.body && (
        <div className="text-[18px] text-slate-200 mb-3 leading-relaxed" dir="auto">
          {post.body}
        </div>
      )}

      {post.image && (
        <div className="w-full overflow-hidden rounded-xl bg-black/20 mb-3">
          <Image
            src={post.image}
            alt="post image"
            width={610}
            height={610}
            className="w-full max-h-137.5 object-cover rounded-xl"
            
          />
        </div>
      )}

      {post.sharedPost && (
        <div className="my-5 p-4 rounded-xl border border-slate-700/80 bg-[#121927] shadow-inner">
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <Link href={`/profile/${post.sharedPost.user._id}`} className="shrink-0">
                <Image
                  className="rounded-full object-cover w-10 h-10 ring-1 ring-slate-800"
                  src={post.sharedPost.user.photo || "/default-avatar.png"}
                  alt="profileUser"
                  width={50}
                  height={50}
                  
                />
              </Link>

              <div className="flex flex-col">
                <Link href={`/profile/${post.sharedPost.user._id}`}>
                  <p className="font-bold text-[15px] text-white hover:text-blue-400 transition">
                    {post.sharedPost.user.name}
                  </p>
                </Link>

                <Link href={`/singlePost/${post.sharedPost._id}`}>
                  <span className="text-xs text-slate-400 hover:underline">
                    {new Date(post.sharedPost.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {post.sharedPost.body && (
            <div className="text-[14px] text-slate-300 mb-3 leading-relaxed" dir="auto">
              {post.sharedPost.body}
            </div>
          )}

          {post.sharedPost.image && (
            <div className="w-full overflow-hidden rounded-lg bg-black/20">
              <Image
                src={post.sharedPost.image}
                alt="shared post"
                width={610}
                height={610}
                className="w-full max-h-112.5 object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </div>
      )}

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-sm text-slate-400 font-medium mt-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2  transition cursor-pointer">
            <LikePost postId={post.id} likesCount={post.likesCount} isLiked={isLiked} />
          </div>

          <div className="flex items-center gap-2  transition cursor-pointer">
            <CommentsPost
              postId={post.id}
              commentsCount={post.commentsCount}
            />
          </div>

          <div className="flex items-center gap-2  transition cursor-pointer">
            <SharePost postId={post.id} shareCount={post.sharesCount} />
            <span>{post.sharesCount}</span>
          </div>
        </div>
        <div className="text-lg">
          <BookmarkPost postId={post.id} bookMarked={bookmarked} />
         
        </div>
      </div>

    </div>
  );
}