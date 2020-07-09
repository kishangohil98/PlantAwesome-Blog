//import Jumbotron from "react-bootstrap/Jumbotron";
import React, { useEffect } from "react";
import "../css/pictureHeader.css";
//import Container from "@material-ui/core/Container";
import { Parallax } from "react-parallax";
import WOW from "wow.js";

const PictureHeader = () => {
  useEffect(() => {
    new WOW().init();
  }, []);
  return (
    <Parallax
      bgImage={require("../images/postblog.jpg")}
      bgImageAlt="Plant Image"
      strength={300}
      className="imageParallax">
      <h1 className="header wow animate__animated animate__pulse">
        Gardening, a Fantastic hobby
      </h1>
      <p className="header wow animate__animated animate__pulse">
        God Almighty first planted a garden. And indeed, it is the purest of
        human pleasures.
      </p>
    </Parallax>

    // <Jumbotron className="postBlogHeader" fluid>
    //   <Container disableGutters>
    //     <h1 className="header">Gardening, a Fantastic hobby</h1>
    //     <p className="header">
    //       God Almighty first planted a garden. And indeed, it is the purest of
    //       human pleasures.
    //     </p>
    //   </Container>
    // </Jumbotron>
  );
};

export default PictureHeader;
