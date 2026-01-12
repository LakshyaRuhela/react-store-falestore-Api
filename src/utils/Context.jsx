import axios from "./axios";
import React, { createContext, useEffect, useState } from "react";

// Make data centralised just create context
export const ProductContext = createContext();

function Context(props) {
  const [products, setProducts] = useState(null); // use state to manage the product details => we have to call from here (axois)

  // Use Axios fro calling the date
  const getProducts = async () => {
    try {
      const { data } = await axios("/products");
      setProducts(data); // fetch data and send it to products array
    } catch (err) {
      console.log(err);
    }
  };

  // for bydefault calling the data from API
  useEffect(() => {
    getProducts();
  }, []);

  return (
    // use Context Provider here to provde all data to all childrens
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}
export default Context;
