import React, { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";

export default () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Fragment>
      <div style={style}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </Fragment>
  );
};
