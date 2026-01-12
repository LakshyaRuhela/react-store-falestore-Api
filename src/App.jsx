import { useState } from "react";
import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";

function App() {
  const { pathname, search } = useLocation(); // for hiding HOme button on Homepage use path , and for on category shown use search
  // console.log(search , pathname);
  
  return (
    <div className="h-screen w-screen flex ">
      {/* Home button */}
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="text-red-500 absolute left-[18%] top-[3%] border p-1 rounded-md hover:text-xl "
        >
          Home
        </Link>
      )}
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home default route */}
        <Route path="/details/:id" element={<Details />} />{" "}
        {/* Details Route */}
      </Routes>
    </div>
  );
}

export default App;
