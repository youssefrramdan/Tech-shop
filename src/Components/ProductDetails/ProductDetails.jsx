import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Audio } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { addProductTOCart } = useContext(cartContext);
  const { id } = useParams();

  async function addProduct(id) {
    const res = await addProductTOCart(id);
    if (res.status === "success") {
      toast.success("Product added successfully!", { duration: 1500, position: "top-center" });
    } else {
      toast.error("Error occurred while adding product.", { duration: 1500, position: "top-center" });
    }
  }

  const { isLoading, data, isFetching, isError } = useQuery(`ProductDetails-${id}`, getProductDetails);

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
        <Audio height="100" width="100" color="#4fa94d" ariaLabel="audio-loading" visible={true} />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/products" />;
  }

  function getProductDetails() {
    return axios.get(`https://gcm.onrender.com/api/products/${id}`);
  }

  const productDetails = data?.data?.product;

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mt-3">
          <img className="w-100" src={productDetails?.imageCover} alt={productDetails?.name} />
        </div>
        <div className="col-md-6 mt-3">
          <h1 className="fw-bold">{productDetails?.name}</h1>
          <p>{productDetails?.description}</p>
          <p className="fw-bold">Category: {productDetails?.category?.name}</p>
          <p className="fw-bold">Brand: {productDetails?.brand?.name}</p>
          <div className="d-flex justify-content-between align-items-center">
            {productDetails?.priceAfterDiscount ? (
              <p className="fw-bold">
                <span className="text-decoration-line-through">{productDetails?.price} EGP</span> - {productDetails?.priceAfterDiscount} EGP
              </p>
            ) : (
              <p className="fw-bold">{productDetails?.price} EGP</p>
            )}
            <p className="fw-bold">Stock: {productDetails?.stock}</p>
          </div>
          <button
            onClick={() => addProduct(productDetails?._id)}
            className="btn bg-main text-white w-100"
            disabled={productDetails?.stock === 0}
          >
            {productDetails?.stock === 0 ? "Out of Stock" : "Add to Cart +"}
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <h3>Product Images</h3>
        {productDetails?.images?.map((image, index) => (
          <div key={index} className="col-md-3 text-center mt-3">
            <img className="w-100" src={image} alt={`Product Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
