import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  /**Getting the actual pathname for condtionally style the navebar*/
  const localPath = (path) => {
    const location = useLocation();
    return location.pathname == path;
  };
  return (
    <>
      <ul className="w-full flex justify-center space-x-8 list-none py-5 bg-navbar font-['Montserrat'] font-medium text-sm text-center text-white uppercase">
        <li className={`py-2 border-b-2 hover:text-orange-300 ${localPath("/") ? "border-blue-200" : "border-transparent"}`}>
          <Link to="/">Home</Link>
        </li>
        <li className={`py-2 border-b-2 hover:text-orange-300 ${localPath("/portfolio") ? "border-blue-200" : "border-transparent"}`}>
          <Link to="/portfolio">Open Maps</Link>
        </li>
        <li className={`py-2 border-b-2 hover:text-orange-300 ${localPath("/about") ? "border-blue-200" : "border-transparent"}`}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
