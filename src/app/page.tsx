import Post from "./createPost/page";
import AllPosts from "./_components/posts/allPosts/AllPosts";
export default async function Page() {
  
  
  return (
    <>
    <div className=" w-full max-w-2xl mx-auto  px-4 ">
      <Post />
      
      <AllPosts/>
     

    </div>
      

    </>
  )
}