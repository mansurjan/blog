import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Singed in user: ", user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
      });
  };

  const onFinishFailed = (errorInfo: string) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="container mx-auto w-full mt-16">
      <div className="flex flex-col items-center justify-center">
        <Form
          className="w-1/3"
          layout="vertical"
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={() => onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: /^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\.([a-zA-Z]{2,5})$/,
                message: "Please enter valid email",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%]).{8,24}$/,
                message: "Please enter a valid password",
              },
              {
                required: true,
                message: "Enter you password",
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <span>
          Don't have account?{" "}
          <Link replace to="/register">
            Register
          </Link>{" "}
        </span>
      </div>
    </section>
  );
};

export default Login;
