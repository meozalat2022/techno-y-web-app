"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Spin } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
import Meta from "antd/es/card/Meta";

const ProductDetails = ({ params }) => {
  const { allProducts } = useSelector((state) => state.product);
  const productId = params.productId;
  const [product, setProduct] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState([]);
  useEffect(() => {
    setLoading(true);

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/backend/product/productById/:${productId}`
        );

        const data = await response.json();

        if (data.success === false) {
          setLoading(false);
          setError(data.message);
        }

        setProduct(data);
        setMainImage(data.images[0]);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 235;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 235;
  };
  return (
    <div className=" ">
      <div className="flex  justify-between mx-12 mt-16">
        {/* product details */}
        <div className=" flex-1  flex flex-col items-end">
          <p>{product.title}</p>
          <Divider />
          <p>{product.description}</p>
          <Divider />
          {!product.specifications ? (
            <Spin />
          ) : (
            <div>
              <p>Brand: {product?.specifications?.brand}</p>
              <p>Speed: {product?.specifications?.speed}</p>
              <p>power: {product?.specifications?.power}</p>
              <p>Color: {product?.specifications?.color}</p>
              <p>Other: {product?.specifications?.other}</p>
            </div>
          )}
        </div>

        {/* product images */}
        <div className=" flex-1 flex justify-end">
          <div className="flex flex-col gap-3 max-w-[500px]">
            <Image
              className="w-96 h-96 rounded-lg shadow-xl object-cover"
              src={mainImage}
              width={500}
              height={500}
              alt={product.title}
            />
          </div>
          <div className="flex flex-col gap-4 px-4 overflow-auto tailwind-scrollbar-hide">
            {product.images &&
              product.images.map((image) => (
                <Image
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
                    mainImage === image ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                  src={image}
                  height={200}
                  width={200}
                  alt={product.title}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="mx-12">
        <Divider />
      </div>

      {/* similar products slider */}
      <div className="mb-2 ml-4">
        <i
          className="text-3xl cursor-pointer hover:border p-1  mr-2 ri-arrow-left-double-line"
          onClick={slideLeft}
        ></i>
        <i
          className=" text-3xl cursor-pointer hover:border p-1 ri-arrow-right-double-line"
          onClick={slideRight}
        ></i>
      </div>
      <div className="flex gap-4 overflow-hidden mx-4" id="slider">
        {allProducts.length > 0 &&
          allProducts.map((item, index) => (
            <Link href={`/ProductDetails/:${item._id}`}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    className="h-[150px]"
                    alt="example"
                    src={item.images[0]}
                  />
                }
              >
                <Meta title={item.title} description={item.description} />
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
