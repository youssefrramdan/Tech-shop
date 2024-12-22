import { useState, useContext } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Products() {
  const { addProductTOCart } = useContext(cartContext);
  const { addToWishList } = useContext(WishListContext);
  const [searchQuery, setSearchQuery] = useState("");

  async function productToWishList(id) {
    const res = await addToWishList(id);
    if (res.status === "success") {
      toast.success("Added successfully to Wish List", { duration: 1000, position: "top-center" });
    } else {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  async function addProduct(id) {
    const res = await addProductTOCart(id);
    if (res.status === "success") {
      toast.success("Added successfully", { duration: 1500, position: "top-center" });
    } else {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  async function getAllProducts() {
    return axios.get("https://gcm.onrender.com/api/products");
  }

  const { isLoading, data } = useQuery("getAllProducts", getAllProducts);

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
        <Audio height="100" width="100" color="#4fa94d" ariaLabel="audio-loading" visible={true} />
      </div>
    );
  }

  const products = data?.data?.products || [];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control shadow border-black"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="container products mt-4">
        <div className="row gy-4">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm position-relative">
                <Link to={`/productdetails/${product._id}`} className="text-decoration-none text-dark">
                  <img
                    src={product.imageCover}
                    className="card-img-top p-3"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center text-truncate" title={product.name}>
                      {product.name}
                    </h5>
                    <p className="text-muted text-center mb-2">
                      {product.category?.name || "No Category"}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      {product.priceAfterDiscount ? (
                        <p className="m-0">
                          <span className="text-decoration-line-through text-muted">
                            {product.price} EGP
                          </span>{" "}
                          <span className="text-success">{product.priceAfterDiscount} EGP</span>
                        </p>
                      ) : (
                        <p className="m-0 text-primary">{product.price} EGP</p>
                      )}
                      <p className="m-0">
                        <span>Stock: {product.stock}</span>
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => productToWishList(product._id)}
                  className="btn btn-light position-absolute top-0 end-0 m-2"
                  title="Add to Wishlist"
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
                <button
                  onClick={() => addProduct(product._id)}
                  className="btn btn-primary w-100 mt-2"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
