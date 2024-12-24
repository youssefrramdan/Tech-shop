// src/components/Orders/Orders.js

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function AllOrders() {
  const { userToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    Authorization: userToken,
  };

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://gcm.onrender.com/api/orders", {
        headers,
      });
      setOrders(response.data.orders || []);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again.", {
        duration: 2000,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">You have no orders yet.</h4>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    {order.OrderItems.map((item) => (
                      <div key={item.product._id}>
                        <strong>{item.product.name}</strong> (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td>{order.totalOrderPrice} EGP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
