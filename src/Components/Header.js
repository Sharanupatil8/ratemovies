import React, { Children } from "react";
import MovieSearchInput from "./MovieSearchInput";

function Header({ children }) {
  console.log(children);
  return <nav className="nav-bar">{children}</nav>;
}

export default Header;
