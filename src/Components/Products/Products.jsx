import { useState, useContext } from "react";
import { Audio } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import "./Products.css";

export default function Products() {
  const { addProductToCart } = useContext(cartContext); // تم تعديل اسم الدالة هنا
  const { addToWishList } = useContext(WishListContext);
  const [searchQuery, setSearchQuery] = useState("");

  // إضافة المنتج إلى قائمة الرغبات
  async function productToWishList(id) {
    try {
      const res = await addToWishList(id);
      if (res?.status === "success") {
        toast.success("Added successfully to Wish List", { duration: 1000, position: "top-center" });
      } else {
        toast.error("Error occurred while adding to Wishlist", { duration: 1500, position: "top-center" });
      }
    } catch (error) {
      toast.error("Unexpected error occurred", { duration: 1500, position: "top-center" });
    }
  }

  // إضافة المنتج إلى السلة
  async function addProduct(productId) {
    try {
      const res = await addProductToCart(productId); // استخدام الدالة الصحيحة هنا
      if (res?.status === "success") {
        toast.success("Added successfully to Cart", { duration: 1500, position: "top-center" });
      } else {
        toast.error("Error occurred while adding to Cart", { duration: 1500, position: "top-center" });
      }
    } catch (error) {
      toast.error("Unexpected error occurred", { duration: 1500, position: "top-center" });
    }
  }

  // جلب جميع المنتجات
  async function getAllProducts() {
    const response = await fetch("https://gcm.onrender.com/api/products");
    return response.json();
  }

  const { isLoading, data, error } = useQuery("getAllProducts", getAllProducts);

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex vh-100 bg-danger bg-opacity-50 justify-content-center align-items-center">
        <h3 className="text-white">Failed to load products. Please try again later.</h3>
      </div>
    );
  }

  const products = data?.products || [];
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* مربع البحث */}
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control shadow border-0"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* قائمة المنتجات */}
      <div className="row gy-4">
        {filteredProducts.length === 0 ? (
          <h4 className="text-center text-muted">No products found</h4>
        ) : (
          filteredProducts.map((product, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="product-card h-100 position-relative">
                {/* حالة المنتج (In Stock أو Out of Stock) */}
                <div className={`stock-indicator ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>

                <Link to={`/productdetails/${product._id}`} className="text-decoration-none text-dark">
                  <div className="product-image">
                    <img src={product.imageCover} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h5 className="text-center">{product.name}</h5>
                    <div className="d-flex justify-content-between">
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-muted text-decoration-line-through">{product.price} EGP</span>
                          <span className="text-success">{product.priceAfterDiscount} EGP</span>
                        </>
                      ) : (
                        <span>{product.price} EGP</span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* الأزرار */}
                <div className="product-actions d-flex justify-content-around mt-3">
                  <button
                    onClick={() => addProduct(product._id)}
                    className="btn btn-primary"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => productToWishList(product._id)}
                    className="btn btn-outline-danger"
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
