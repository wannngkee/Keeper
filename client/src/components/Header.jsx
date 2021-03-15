import React from "react";
import { Link, useHistory } from "react-router-dom";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  const currentRoute = useHistory().location.pathname.toLowerCase();
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
        <Link
          className={currentRoute === "/login" ? "focus" : "link"}
          to="/login"
        >
          Sign in
        </Link>{" "}
        |{" "}
        <Link
          className={currentRoute === "/register" ? "focus" : "link"}
          to="/register"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Header;
