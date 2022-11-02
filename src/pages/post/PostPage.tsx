import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { deletePost, selectPostById } from "../../redux/post/postSlice";
import { Post, HandleDelete, Function } from "../../interface/interface";

const PostPage: React.FC = () => {
  const postId: string = useParams().postId!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const post: Post = useAppSelector((state) => selectPostById(state, postId));
  const isLogged: boolean = useAppSelector((state) => state.auth.isLogged);

  const handleDelete: HandleDelete = (id: string) => {
    console.log(id);
    dispatch(deletePost(post.id));
    openNotification();
    navigate("/");
  };

  const openNotification: Function = () => {
    const args = {
      message: "Post Deleted",
      duration: 2,
    };
    notification.open(args);
  };
  return (
    <section className="container mx-auto w-full my-12 px-12">
      <div className="relative">
        {isLogged && (
          <div className="absolute top-1 right-0 gap-8">
            <Link to="edit">
              <EditOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
            </Link>
            <DeleteOutlined
              style={{ fontSize: "24px" }}
              onClick={() => handleDelete(postId)}
            />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8">{post?.title}</h1>
        <p className="text-lg">{post?.body}</p>
      </div>
    </section>
  );
};

export default PostPage;
