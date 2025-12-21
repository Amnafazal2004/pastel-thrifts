"use client";
import React, { useEffect, useState } from "react";
import Shopitems from "./Shopitems";
import { useThriftContext } from "@/Context/ThriftContext";
import axios from "axios";

const Showposts = () => {
  const [products, setproducts] = useState([]);
  const { user } = useThriftContext();
  const { setsidebar } = useThriftContext();

  const fetchproducts = async () => {
    const { data } = await axios.get("/api/products/allproducts");
    console.log("got it");
    setproducts(data.products);
    console.log(data.products);
  };
  useEffect(() => {
    setsidebar(true);
  }, [setsidebar]);

  useEffect(() => {
    if (user) {
      fetchproducts();
    }
  }, [user]);
  
  return (
    <>
      {products.map((item, index) => {
        return (
          <Shopitems
            key={index}
            id={item._id}
            image={item.image[0]}
            productname={item.productname}
            description={item.description}
            category={item.category}
            price={item.price}
            soldout={item.soldout}
          />
        );
      })}
    </>
  );
};

export default Showposts;
