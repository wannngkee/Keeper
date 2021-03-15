import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./form.css";

export default function SignupForm() {
  const itemlayout = {
    labelCol: { offset: 8, span: 8 },
    wrapperCol: { offset: 8, span: 8 },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div className="title">
        <h4>Join Keeper</h4>
        <h1>Create Your Account</h1>
      </div>
      <Form
        {...itemlayout}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className="item"
          label="Email"
          name="Email"
          rules={[
            { type: "email", message: "Invalid email address" },
            { required: true, message: "Please enter your email!" },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item
          className="item"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>

        <Form.Item {...itemlayout}>
          <Button className="submitbtn" type="primary" htmlType="submit">
            register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
