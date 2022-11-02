import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { selectAllPosts } from "../../redux/post/postSlice";
import { Post } from "../../interface/interface";

const PostList: React.FC = () => {
  const posts: Post[] = useSelector(selectAllPosts);

  return (
    <section className="container mx-auto w-full px-12 my-12">
      <h1 className="text-3xl font-bold ml-4">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostList;
