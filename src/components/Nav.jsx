import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
function Nav() {
  const [products] = useContext(ProductContext); // fetch products data
  // now find the distinct category  by reduce functionality  // basically used for sorting
  // it has accumalator and current value and give two arrays
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)]; // use Set to find distinct values
  // console.log(distinct_category);

  // function for nav colour
  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()}, 0.7)`;
  };
  //console.log(color);

  return (
    <nav className="w-[15%] h-full bg-zinc-100  flex flex-col items-center pt-5">
      {/*Button for add product  */}
      <a
        className="px-6 py-3 rounded-md border border-blue-200 text-blue-300 "
        href="/create"
      >
        Add new Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-3">Category</h1>

      {/* Category  */}
      <div className=" w-[80%]">
        {/*Map on distinct categories */}
        {distinct_category.map((c, i) => (
          <Link
            to={`/?category=${c}`}
            key={i}
            className=" mb-3 flex items-center"
          >
            {/* span for circle in front of categoy name  */}
            <span
              style={{ backgroundColor: color() }}
              className=" w-[15px] h-[15px] mr-2 bg-blue-300 rounded-full"
            ></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
}
export default Nav;
