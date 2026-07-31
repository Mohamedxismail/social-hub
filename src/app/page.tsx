import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Post from "./createPost/page";
import AllPosts from "./_components/posts/allPosts/AllPosts";
export default async function Page() {
  const session = await getServerSession(authOptions);
  
  return (
    <>
    <div className=" w-full max-w-2xl mx-auto  px-4 ">
      <Post />
      
      <AllPosts/>
     

    </div>
      

    </>
  )
}