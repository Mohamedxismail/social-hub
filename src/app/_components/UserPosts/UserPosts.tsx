import { cookies } from 'next/headers';
import PostCard from '../PostCard.tsx/PostCard';
import { getMyToken } from '@/utilities/token';
import { CgUnavailable } from "react-icons/cg";
import Post from '@/app/createPost/page';
import { getUserProfile } from '@/services/profile';

type DecodedToken = {
  token: string;
  user: {
    _id: string;
  };
};

type userProps = {
    userId:string;
}
export default async function UserPosts({userId}:userProps) {
    const cookieStore = await cookies()
    const tokenv = (await getMyToken()) as DecodedToken
    
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/userPosts?userId=${userId}`,{
        method:"GET",
        headers:{
            Cookie: cookieStore.toString(),
        }
    })
    const data = await res.json()
    const posts = data?.data?.posts
    const {isMyProfile } = await getUserProfile(userId)
    
  return (
    
     <div className="flex flex-col gap-2 mb-8 justify-center mt-7">
       
        <h1 className='text-3xl font-bold mt-5 mb-5'>Posts</h1>
        {isMyProfile && <div className='mb-5 mt-0'><Post /></div>}
        
        {posts.length ===0 && <div className='mx-auto mt-5 md:mb-2 mb-14 flex flex-col gap-4 items-center'>
            <CgUnavailable className='text-7xl' />
            <p className='text-3xl'>No posts available</p>
            </div>}
          {posts.map((post :React.ComponentProps<typeof PostCard>["post"]) => (
            <PostCard
              key={post.id || post._id}
              post={post}
              userId={tokenv.user._id}
            />
          ))}

        </div>
  )
}
