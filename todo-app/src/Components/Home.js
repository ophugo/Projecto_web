import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Aqui es donde va ir la pagina principal</p>
      <Button variant="contained" color="primary">
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "white",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p>login</p>
        </Link>
      </Button>
    </div>
  );
};

export default Home;
