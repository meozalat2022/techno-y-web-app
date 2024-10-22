"use client";
import { Carousel, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
} from "@/redux/product/productSlice";
import Link from "next/link";
import FilteredProducts from "@/components/FilteredProducts";
import { useRouter } from "next/navigation";
const contentStyle = {
  height: "360px",
  color: "#fff",
  lineHeight: "360px",
  textAlign: "center",
  background: "#364d79",
};
const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { allCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(getProductsStart());
        const res = await fetch(
          "http://localhost:8000/backend/product/products"
        );

        const data = await res.json();

        if (data.success === false) {
          dispatch(getProductsFailure(data));
          return;
        }
        setAllProducts(data);
        dispatch(getProductsSuccess(data));
      } catch (error) {
        dispatch(getProductsFailure(error.message));
      }
    };
    fetchProducts();
  }, []);

  const promotion = allProducts.filter((item) => item.promotionRate > 0);
  const sortedCategories = [];
  for (let i in allCategories) {
    sortedCategories.push(allCategories[i]);
  }

  sortedCategories.sort((a, b) => {
    if (b.createdAt < a.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  });

  const [filterProducts, setFilterProducts] = useState();
  const [categoryId, setCategoryId] = useState("665582bfe00a2f6280da6b64");
  const filterItems = (catId) => {
    const newItem = allProducts.filter((newVal) => {
      return newVal.category === catId;
    });
    setFilterProducts(newItem);
    setCategoryId(catId);
  };
  const [catIndex, setCatIndex] = useState(9);
  useEffect(() => {
    setFilterProducts(
      allProducts.filter((item) => item.category === "665582bfe00a2f6280da6b64")
    );
  }, [allProducts]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[950px] mb-16">
        {/* Carousel */}
        <Carousel autoplay>
          {promotion?.map((item) => (
            <div>
              <h3 style={contentStyle}>{item.title}</h3>
            </div>
          ))}
        </Carousel>
      </div>
      {/* products by category filter */}
      <div className="flex mt-10 gap-8 content-center">
        {sortedCategories.length > 0 &&
          sortedCategories.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                filterItems(item._id), setCatIndex(index);
              }}
              className={`bg-primary rounded-full w-24 h-24 flex justify-center items-center cursor-pointer ${
                catIndex === index ? "opacity-75" : ""
              }`}
            >
              <p className="text-white font-semibold">{item.title}</p>
            </div>
          ))}
      </div>
      <div>
        {!filterProducts || filterProducts.length < 1 ? (
          <Spin />
        ) : (
          <FilteredProducts products={filterProducts} />
        )}
      </div>
      <div className="mt-10 bg-slate-700 py-4 px-10 hover:opacity-80 rounded-xl">
        <Link
          className=" text-center text-white "
          href={`/productByCategory/:${categoryId}`}
        >
          المزيــــــد
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
