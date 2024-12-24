
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const { placeOrder } = useContext(cartContext);
    const [shippingAddress, setShippingAddress] = useState({
        street: "",
        phone: "",
        city: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const handleSubmit = async () => {
        if (!shippingAddress.street || !shippingAddress.phone || !shippingAddress.city) {
            toast.error("Please fill all fields!", { duration: 2000 });
            return;
        }

        setIsLoading(true);
        const result = await placeOrder(shippingAddress);
        setIsLoading(false);

        if (result.status === "success") {
            toast.success("Order placed successfully!", { duration: 2000 });
            navigate("/allorders");
        } else {
            toast.error(result.message || "Failed to place order.", { duration: 2000 });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Checkout</h2>

            <div className="card shadow-lg p-4">
                <h4 className="text-primary mb-3">Shipping Address</h4>

                <form>
                    <div className="mb-3">
                        <label htmlFor="street" className="form-label">Street Address</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            className="form-control"
                            placeholder="Enter street address"
                            value={shippingAddress.street}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={shippingAddress.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-control"
                            placeholder="Enter city"
                            value={shippingAddress.city}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Placing Order..." : "Place Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}
