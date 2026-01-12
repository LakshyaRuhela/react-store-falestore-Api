import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation(); // we use useLoaction to found the search querry
  // console.log(search);
  const category = decodeURIComponent(search.split("=")[1]); // to decode the Category from the URI to normal text
  // console.log(category);

  const [filteredProducts, setFilteredProducts] = useState(null); // state for filtered products fill by null

  // function to call products categorywise
  const getProductcategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      // console.log(data);
      setFilteredProducts(data); // set data to filter products
    } catch (err) {
      console.log(err);
    }
  };
  // call that category data
  useEffect(() => {
    // console.log(category);
    if (!filteredProducts || category == "undefined")
      setFilteredProducts(products); // if filterproduct have nothing thne set them
    if (category != "undefined") getProductcategory(); // if category was not equals to undefined then call for finding by category
  }, [category, products]);

  return (
    <>
      {/* Nav should ALWAYS show */}
      <Nav />

      {/* If products not loaded yet */}
      {!products ? (
        <Loading />
      ) : (
        <div className="w-[85%] pt-[5%] p-10 flex flex-wrap overflow-x-hidden overflow-y-auto gap-6">
          {filteredProducts &&
            filteredProducts.map((p) => (
              <Link key={p.id} to={`/details/${p.id}`}>
                {/* Card */}
                <div className="w-[220px] h-[250px] card border rounded shadow p-3 flex flex-col items-center hover:scale-105 transition">
                  {/* Image */}
                  <div
                    className="w-full h-[200px] bg-contain bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${p.image})`,
                    }}
                  ></div>

                  {/* Title */}
                  <h1 className="text-sm font-bold text-center mt-3 hover:text-blue-400">
                    {p.title}
                  </h1>
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );
}

export default Home;
