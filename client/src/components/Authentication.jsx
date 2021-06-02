import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <p
      className="auth"
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
    >
      Log in
    </p>
  );
};

const Logout = () => {
  const { logout, user } = useAuth0();
  const { email, given_name } = user;
  return (
    <>
      <p>Hi {given_name ? given_name : email} !</p>
      <p
        className="logout auth"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log out
      </p>
    </>
  );
};

const Authentication = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Logout /> : <Login />;
};

export default Authentication;
