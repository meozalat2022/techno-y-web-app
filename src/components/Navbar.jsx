"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
} from "@/redux/category/categorySlice";
import Link from "next/link";
const Navbar = () => {
  const { error, loading, allCategories } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(getCategoriesStart());
        const response = await fetch(
          "http://localhost:8000/backend/category/categories"
        );

        const data = await response.json();

        if (data.success === false) {
          dispatch(getCategoriesFailure(data));
          return;
        }
        dispatch(getCategoriesSuccess(data));
      } catch (error) {
        dispatch(getCategoriesFailure(error.message));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-accent flex gap-1 justify-end  h-24 items-center px-6 ">
      {allCategories.map((item) => (
        <Link
          href={`/productByCategory/:${item._id}`}
          className="cursor-pointer text-white font-bold p-2 xl:w-28 hover:border border-md rounded-lg hover:translate-y-1 text-center hidden xl:flex justify-center items-center"
        >
          {item.title}
        </Link>
      ))}
      <Link
        href="?modal=true"
        className="flex items-center gap-2 p-1 px-3 text-white font-bold cursor-pointer hover:border border-md rounded-lg hover:translate-y-1 text-center"
      >
        <p>الكل</p>
        <i className="ri-menu-line text-white font-bold text-3xl"></i>
      </Link>
    </div>
  );
};

export default Navbar;
