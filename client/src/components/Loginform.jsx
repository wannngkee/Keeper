import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./form.css";

export default function SigninForm() {
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
      <div className="title ">
        <h1>Sign in to Keeper</h1>
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
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>

        <Form.Item {...itemlayout}>
          <Button className="submitbtn" type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <h5>
        New to Keeper? <Link to="/register">Create an account</Link>.
      </h5>
    </div>
  );
}
