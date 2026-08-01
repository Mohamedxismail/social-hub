import { getMyToken } from "@/utilities/token";
import PostCard from "../../PostCard.tsx/PostCard";

type DecodedToken = {
  token: string;
  user: {
    _id: string;
  };
};

export async function AllPosts() {
  const tokenv = (await getMyToken()) as DecodedToken;
  const token = tokenv?.token;

  const res = await fetch("https://route-posts.routemisr.com/posts", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  const posts = data.data.posts;
  
  return (
    <div className="flex flex-col gap-2 md:mb-10 mb-24 justify-center mt-4 md:p-2">
      {posts.map((post :React.ComponentProps<typeof PostCard>["post"]) => (
        <PostCard
          key={post.id}
          post={post}
          userId={tokenv.user._id}
        />
      ))}
    </div>
  );
}

export default AllPosts;