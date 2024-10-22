"use client";
import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import Link from "next/link";
const { Meta } = Card;
const ProductByCategory = ({ params }) => {
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const catId = params.catId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const rest = await fetch(
          `http://localhost:8000/backend/product/productByCategory/:${catId}`
        );
        const data = await rest.json();

        if (data.success === false) {
          setError(data.error.message);
          setLoading(false);
          return;
        }

        setProductsList(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [catId]);
  if (!catId) {
    return <Spin />;
  }
  return (
    <div className="h-full">
      <div className="flex gap-6 my-4 justify-center">
        {productsList.length > 0 &&
          productsList.map((item, index) => (
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

export default ProductByCategory;
