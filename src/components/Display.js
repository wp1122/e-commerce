import React from "react";
import Card from "./Card";

const Display = (props) => {
  if (props.products.length === 0) {
    return (
      <div className="row align-items-center">
        <div className="col">No Matching Results Found!</div>
      </div>
    );
  }
  return (
    <div className="row justify-content-around">
      {props.products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Display;
