"use client";
import React, { useState } from "react";
import { Button, InputNumber, Select, Form, Input } from "antd";
import { CldUploadWidget } from "next-cloudinary";

const Products = () => {
  const [images, setImages] = useState([]);

  const onFinish = async (values) => {
    const response = await fetch(
      "http://localhost:8000/backend/product/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          category: values.category,
          promotionRate: values.promotionRate,
          price: values.price,
          images: images,
          brand: values.brand,
          specifications: {
            brand: values.specificationsBrand,
            speed: values.specificationsSpeed,
            power: values.specificationsPower,
            other: values.specificationsOther,
          },
        }),
      }
    );
    window.location.href = "/Dashboard/Products";

    const data = await response.json();
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo);
  };

  const options = [
    {
      value: "665582bfe00a2f6280da6b64",
      label: "تكييف",
    },
    {
      value: "665582e2e00a2f6280da6b68",
      label: "ثلاجة",
    },
    {
      value: "665582fde00a2f6280da6b6c",
      label: "غسالة",
    },
    {
      value: "66558333e00a2f6280da6b74",
      label: "سخان",
    },
    {
      value: "66558359e00a2f6280da6b78",
      label: "ميكروويف",
    },
    {
      value: "6655836ce00a2f6280da6b7c",
      label: "مروحة",
    },
    {
      value: "66558383e00a2f6280da6b80",
      label: "مكواة",
    },
    {
      value: "6655839ce00a2f6280da6b8",
      label: "خلاط وكبة",
    },
    {
      value: "665583b4e00a2f6280da6b88",
      label: "مبرد مياه",
    },
  ];

  const onUpload = (result) => {
    setImages([...images, result.info.secure_url]);
  };
  return (
    <div className="mt-10 flex ml-10">
      <Form
        clearOnDestroy="true"
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

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          <Select
            defaultValue=""
            style={{
              width: 120,
            }}
            options={options}
          />
        </Form.Item>
        <Form.Item label="Promotion" name="promotionRate">
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <InputNumber min={1} max={10000000} />
        </Form.Item>

        <div className="flex justify-center ">
          <CldUploadWidget uploadPreset="skwsbpf7" onUpload={onUpload}>
            {({ open }) => {
              return (
                <button
                  type="button"
                  className="bg-slate-500 p-2 text-white font-semibold rounded-lg"
                  onClick={() => open()}
                >
                  Upload Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Please input your brand!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <p>Specifications</p>
        <Form.Item label="Brand" name="specificationsBrand">
          <Input />
        </Form.Item>
        <Form.Item label="Speed" name="specificationsSpeed">
          <Input />
        </Form.Item>
        <Form.Item label="Power" name="specificationsPower">
          <Input />
        </Form.Item>
        <Form.Item label="Other" name="specificationsOther">
          <Input />
        </Form.Item>
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
    </div>
  );
};

export default Products;
