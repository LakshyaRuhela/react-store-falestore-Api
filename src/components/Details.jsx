import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
function Details() {
  //const { products } = useContext(ProductContext); // fetch data of products from context
  const [product, setProducts] = useState(null); // state to save single product data

  // we can get the single data from function by Id
  const { id } = useParams(); // get the clicked ID
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      // save the data to state
      setProducts(data);

      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  // call the get SingleProduct function automatically
  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    // Main container
    // if product not available then loading O/W data
    <>
      {!product ? (
        <Loading />
      ) : (
        <div className="w-[70%] h-full container m-auto py-[10%] flex justify-center">
          {/* Image of product */}
          <img
            className="w-[40%] h-[90%] object-contain"
            src={`${product.image}`}
            alt=""
          />
          {/*Daetails of product  */}
          <div className="content w-[50%]">
            <h1 className="text-4xl mt-6">{product.title}</h1>
            <h3 className="text-zinc-600  text-xl">{product.category}</h3>
            <h2 className="text-red-500 text-2xl"> $ {product.price}</h2>
            <p className=" mb-5 mt-2 text-sm"> {product.description}</p>
            {/*Buttons for edit and delete */}
            <Link className=" py-2 px-5 mr-5 border rounded-md border-blue-500 text-blue-500">
              Edit
            </Link>
            <Link className="py-2 px-5 border rounded-md border-red-500 text-red-500">
              Delete
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
export default Details;
