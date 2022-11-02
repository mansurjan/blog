import { Link } from "react-router-dom";
import { Button } from "antd";
import { PostProps } from "../../interface/interface";

interface Component {
  post: PostProps;
}

const SinglePost: React.FC<Component> = ({ post }: Component) => {
  return (
    <article className="flex flex-col gap-y-4  w-full p-4">
      <h2>{post.title}</h2>
      <p>{post.body?.substring(0, 200)}...</p>
      <Button type="primary">
        <Link to={`/posts/${post.id}`}>Read More</Link>
      </Button>
    </article>
  );
};

export default SinglePost;
