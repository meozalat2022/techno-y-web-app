"use client";
import React from "react";
import { Divider } from "antd";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const isBrowser = () => typeof window !== "undefined";
  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div
        onClick={scrollToTop}
        className="w-full h-10 flex justify-center items-center hover:cursor-pointer hover:opacity-75 bg-accent"
      >
        <p>الرجوع للأعلى</p>
      </div>
      <div className="bg-logo  h-56 px-6 py-4 flex justify-center items-center">
        <div className="w-3/5 flex-row justify-between flex">
          <div>Contact us</div>
          <div>
            <p className="font-bold size-4 w-full pb-8 text-right ">
              تسوق معنا
            </p>
            <ul className="flex justify-between flex-col">
              <li className="cursor-pointer text-right mt-2  hover:underline">
                <Link href="#">حسابك</Link>
              </li>
              <li className="cursor-pointer text-right mt-2 hover:underline">
                <Link href="#">مشترياتك</Link>
              </li>
              <li className="cursor-pointer text-right mt-2 hover:underline">
                <Link href="#">عناوينك</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold size-4 w-full pb-8 text-right">
              اعرف المزيد عنا
            </p>
            <ul>
              <li className="cursor-pointer text-right mt-2 hover:underline">
                معلومات عن تكنو-واي
              </li>
              <li className="cursor-pointer text-right mt-2 hover:underline">
                وظائف
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-logo h-24 flex justify-center flex-col">
        <Divider className="bg-white" />
        <div className="flex flex-row justify-center mb-10 py-4">
          <div className=" flex flex-row gap-4">
            <Image
            className="hover:cursor-pointer"
              alt="google play application"
              width={150}
              height={150}
              src="/google_play.png"
            />
        
            <Image
            className="hover:cursor-pointer"
              alt="Apple application"
              width={150}
              height={150}
              src="/app_store.png"
            />
          </div>
        </div>
      </div>
        {/* <div className="bg-logo  flex justify-center items-center">

        <p className="mb-4">حقوق النشر</p>
        </div> */}
    </div>
  );
};

export default Footer;
