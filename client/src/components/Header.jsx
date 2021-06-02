import React from "react";
import { Link, useHistory } from "react-router-dom";
import HighlightIcon from "@material-ui/icons/Highlight";
import Authentication from "./Authentication";

function Header() {
  // const currentRoute = useHistory().location.pathname.toLowerCase();
  return (
    <header className="box">
      <div className="left">
        <Link className="link" to="/">
          <h1>
            <HighlightIcon /> Keeper
          </h1>
        </Link>
      </div>
      <div className="right">
        <Authentication />
      </div>
    </header>
  );
}

export default Header;
