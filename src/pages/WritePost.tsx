import { Form, Input, Button } from "antd";
import { createPost } from "../redux/post/postSlice";
import { useAppDispatch } from "../hooks/hooks";
import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
import { Post } from "../interface/interface";

const nanoid = customAlphabet("1234567890", 10);

const WritePost = () => {
  const dispatch = useAppDispatch();
  const { TextArea } = Input;
  const navigate = useNavigate();

  const onFinish = (values: Post) => {
    values.id = nanoid();
    values.date = new Date().toISOString();
    console.log("Success:", values);
    dispatch(createPost(values));
    navigate("/");
  };

  const onFinishFailed = (errorInfo: string) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="container mx-auto w-full mt-8 px-12 ">
      <div className="flex justify-between mb-12">
        <h1 className="text-2xl">Write Post</h1>
      </div>

      <div className="flex flex-col relative items-center w-full">
        <Form
          onFinish={onFinish}
          onFinishFailed={() => onFinishFailed}
          className="w-full">
          <Form.Item
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
          <Form.Item className="text-right mb-16 absolute -top-20 right-0">
            <Button type="primary" size="large" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default WritePost;
