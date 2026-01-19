import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 border">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Central Perk Cafe</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
          PLACED
        </span>
      </div>

      <div className="mt-3 text-gray-700 text-sm">
        {order.orderItems}
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold">₹{order.totalAmount}</p>

        
      </div>
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Order fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-purple-600 mb-4">Your Orders</h1>

        {orders.length === 0 && (
          <div className="bg-white p-6 rounded-xl text-center shadow">
            <p className="text-gray-500">No orders yet 🍔</p>
          </div>
        )}

        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
