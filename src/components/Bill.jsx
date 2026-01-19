import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function Bill() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();

  const isOfferApplied = cartTotal > 250;
  const discount = isOfferApplied ? Math.round(cartTotal * 0.5) : 0;
  const discountedTotal = cartTotal - discount;
  const gst = Math.round(discountedTotal * 0.05);
  const grandTotal = discountedTotal + gst;

  const placeOrder = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map(item => `${item.name} x1`).join(", "),
        totalAmount: grandTotal
      };

      await axios.post("http://localhost:8080/api/orders/place", orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      clearCart();

      alert("Order placed successfully 🎉");

      // ✅ send success flag to menu page
      navigate("/menu", {
        replace: true,
        state: { orderSuccess: true }
      });

    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order ❌");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 pb-32">

      {/* Header */}
      <div className="bg-white p-4 shadow flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-purple-600 font-semibold cursor-pointer"
        >
          ←
        </button>
        <div>
          <h1 className="text-lg font-bold">Central Perk</h1>
          <p className="text-sm text-gray-500">Your Order</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Items</h2>

          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <span>{item.name}</span>
              <div className="flex items-center gap-4">
                <span>₹{item.price}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 font-bold text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill details */}
        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h2 className="font-semibold mb-4">Bill Details</h2>

          <div className="flex justify-between mb-2">
            <span>Item Total</span>
            <span>₹{cartTotal}</span>
          </div>

          {isOfferApplied && (
            <div className="flex justify-between text-green-600 mb-2 font-medium">
              <span>50% OFF Applied 🎉</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="flex justify-between mb-2">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>To Pay</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Place order button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <button
          onClick={placeOrder}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg font-semibold cursor-pointer"
        >
          Place Order ₹{grandTotal}
        </button>
      </div>

    </div>
  );
}
