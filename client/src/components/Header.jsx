import React from "react";
import { Link } from "react-router-dom";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  return (
    <header className="box">
      <div className="left">
        <Link className="link" to="/">
          <h1>
            <HighlightIcon /> Keeper
          </h1>
        </Link>
      </div>
      <div className="right link">
        <Link className="link" to="/signin">
          Sign in
        </Link>{" "}
        |{" "}
        <Link className="link" to="/signup">
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Header;
