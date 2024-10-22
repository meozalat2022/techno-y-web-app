"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "antd";
import Image from "next/image";

const ImageUploader = ({ onChange, onRemove, images, setImages }) => {
  const onUpload = (result) => {
    setImages(result.info.secure_url);
  };
  return (
    <div className="ml-48 mt-10 mb-10 w-[300px] ">
      <div className="w-[200px]">
        {!images || images.length <= 0 ? (
          ""
        ) : (
          <Image
            width={200}
            height={200}
            src={images}
            alt="category"
            className="object-cover rounded-lg"
          />
        )}
        {/* {images.length > 0 &&
          images.map((url) => (
            <div key={url} className="relative w-[200px] h-[200px]">
              <div className="absolute top-0 right-0 z-10">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="text-white bg-red-500"
                  size="sm"
                >
                </Button>
              </div>
              <Image
                fill
                src={url}
                alt="collection"
                className="object-cover rounded-lg"
              />
            </div>
          ))} */}
      </div>
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
  );
};

export default ImageUploader;
