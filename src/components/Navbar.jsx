import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  /**Getting the actual pathname for condtionally style the navebar 
   * this function target all routes that begin with the same path, ex: /about, about/us */
  const localPath = (path) => {
    const location = useLocation();
    const targetPath = location.pathname.split('/')[1] //getting only the first path, position 0 is empty
    return targetPath == path.replace('/', '');
  };
  return (
    <nav className="z-50">
      <ul className="w-full flex justify-center space-x-8 list-none py-3 md:py-5 bg-navbar font-['Montserrat'] font-medium text-sm text-center text-white uppercase">
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
    </nav>
  );
}

export default Navbar;
