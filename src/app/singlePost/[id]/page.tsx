import CommentsPost from "@/app/_components/CommentsPost/CommentsPost";
import PostCard from "@/app/_components/PostCard.tsx/PostCard";
import { getMyToken } from "@/utilities/token";
import { cookies } from "next/headers";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
type DecodedToken = {
  token: string;
  user: {
    _id: string;
  };
};
export async function SinglePost({ params }: Props) {
  const tokenv = (await getMyToken()) as DecodedToken;

  const { id } = await params
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getSinglePost?postId=${id}`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    }
  })
  const data = await res.json()
  const post = data.data.post;
  console.log(post);


  return (
    <div className='mt-22 text-white ms-10 w-140'>

      <PostCard
        key={post.id}
        post={post}
        userId={tokenv.user._id}
      />
      

    </div>
  )
}

export default SinglePost
