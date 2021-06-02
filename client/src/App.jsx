import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Route exact path="/" component={Home} />
    </>
  );
}

export default App;
