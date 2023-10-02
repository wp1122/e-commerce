import React, { useEffect, useState } from "react";

function importImage(imageName) {
  return require(`../assets/${imageName}`);
}

const Card = (props) => {
  return (
    <div className="card col-sm-5 col-md-3 col-9 m-1">
      <h5 className="card-title pt-2">{props.product.name}</h5>
      <img
        className="card-img-top"
        src={importImage(props.product.imageURL)}
        alt="Card image cap"
      />
      <div className="card-body row justify-content-between">
        <p className="card-text col-4">
          <small>
            <strong>Rs {props.product.price}</strong>
          </small>
        </p>
        <a href="#" className="btn btn-secondary btn-sm col-6">
          Add to Cart
        </a>
      </div>
    </div>
  );
};

export default Card;
