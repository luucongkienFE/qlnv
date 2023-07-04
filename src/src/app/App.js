import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { useEffect } from "react";
import axios from "axios";
const App = () => {
  const content = useRoutes(routes);
  const getData = async () => {
    return await axios.post(
      "http://em-dev.oceantech.com.vn/em/oauth/token",
      {
        client_id: "core_client",
        grant_type: "password",
        client_secret: "secret",
        username: "admin",
        password: "admin",
      },
      {
        headers: {
          Authorization: "Basic Y29yZV9jbGllbnQ6c2VjcmV0",
        },
      }
    );
  };
  useEffect(() => {
    getData().then((res) => {
      localStorage.setItem("access_token", res?.data.access_token);
    });
  }, []);
  return (
    <>
      <>{content}</>
    </>
  );
};

export default App;
