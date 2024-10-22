"use client";
import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import Navbar from "./Navbar";
import Link from "next/link";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const Header = () => {
  return (
    <div className="h-36 flex flex-col">
      <div className="bg-primary px-6 flex h-full items-center justify-between">
        {/* shopping cart left */}

        {/* log in user left  */}
        <div className="">
          <p className="">Log in user here</p>
        </div>

        {/* search bar middle */}
        <div className="hidden xl:flex">
          <Space direction="vertical">
            <Search
              className="text-right"
              placeholder="بحث عن منتج"
              allowClear
              size="large"
              onSearch={onSearch}
              style={{
                width: 600,
              }}
            />
          </Space>
        </div>

        {/* logo right*/}
        <Link href="/">
          <p>Logo in user here</p>
        </Link>
      </div>
      {/* <Navbar /> */}
    </div>
  );
};

export default Header;
