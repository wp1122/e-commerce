import React from "react";

function importImage(imageName) {
  return require(`../assets/${imageName}`);
}

const Card = (props) => {
  return (
    <div className="card col-sm-5 col-md-3 col-9 m-1 mb-2">
      <h5 className="card-title pt-2">{props.product.name}</h5>
      <img
        width={190}
        height={190}
        className="card-img-top"
        alt={props.product.id}
        src={importImage(props.product.imageURL)}
      />
      <div className="card-body row justify-content-between">
        <p className="card-text col-4">
          <small>
            <strong>Rs {props.product.price}</strong>
          </small>
        </p>
        <button className="btn btn-secondary btn-sm col-6">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
