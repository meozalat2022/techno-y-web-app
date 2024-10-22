"use client";
import React, { useState } from "react";
import { Button, Checkbox, Descriptions, Form, Input } from "antd";
import ImageUploader from "@/components/ImageUploader";

const Categories = () => {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const onFinish = async (values) => {
    console.log(values);
    const response = await fetch(
      "http://localhost:8000/backend/category/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          image: images,
        }),
      }
    );

    const data = await response.json();
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your description!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <div className="w-[250px]">
        <ImageUploader images={images} setImages={setImages} />
      </div>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Categories;
