import { Form, Input, Button, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { updatePost, selectPostById } from "../redux/post/postSlice";
import { Post } from "../interface/interface";

const EditPost = () => {
  const postId = useParams().postId!;
  const post: Post = useAppSelector((state) => selectPostById(state, postId));

  const title: string = post.title;
  const body: string = post.body;

  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSave = (values: Post) => {
    values.id = postId;
    dispatch(updatePost(values));
    openNotification();
    navigate(`/posts/${postId}`);
  };

  const onSaveFailed = (errorInfo: string) => {
    console.log("Failed:", errorInfo);
  };

  const openNotification = () => {
    const args = {
      message: "Post Saved",
      duration: 1,
    };
    notification.open(args);
  };
  return (
    <div>
      <section className="container mx-auto w-full  my-12">
        <h2 className="mb-8 text-2xl">Edit Post</h2>
        <Form
          onFinish={(values) => onSave(values as Post)}
          onFinishFailed={() => onSaveFailed}
          className="w-full relative">
          <Form.Item
            initialValue={title}
            className="mb-12"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter title",
              },
            ]}>
            <Input
              className="p-3 w-full bg-gray-100  text-2xl "
              placeholder="Title"
            />
          </Form.Item>
          <Form.Item
            initialValue={body}
            name="body"
            rules={[
              {
                required: true,
                message: "Please enter body",
              },
            ]}>
            <TextArea
              className="p-4 w-full bg-gray-100  text-lg"
              placeholder="Please write something..."
              autoSize={{ minRows: 12 }}
            />
          </Form.Item>
          <Form.Item className="text-right mb-16 absolute -top-16 right-0">
            <Button type="primary" size="large" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default EditPost;
