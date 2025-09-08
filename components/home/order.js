import { IconEye } from "@tabler/icons-react";
import React from "react";

const orders = [
  {
    product: "Premium Wireless Headphones",
    id: "#ORD-001",
    date: "2024-01-15",
    price: 299,
    status: "Delivered",
  },
  {
    product: "Smart Watch Series 5",
    id: "#ORD-002",
    date: "2024-01-12",
    price: 399,
    status: "Shipped",
  },
  {
    product: "Bluetooth Speaker",
    id: "#ORD-003",
    date: "2024-01-10",
    price: 99,
    status: "Processing",
  },
];

const OrderHistory = () => {
  return (
    <div className="bg-[#fcfcfc] m-5 lg:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
      <div className="mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl">Order History</h1>
        <p className="text-[#616161] text-sm sm:text-base">
          View all your past orders
        </p>
      </div>

      <div className="flex flex-col gap-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
            <div>
              <h2 className="font-semibold text-lg">{order.product}</h2>
              <p className="text-gray-500 text-sm">
                {order.id} • {order.date}
              </p>
            </div>

            <div className="flex items-center gap-x-3 mt-3 sm:mt-0">
              <span className="font-semibold text-lg">${order.price}</span>

              <span
                className={`flex items-center gap-x-1 text-xs px-3 py-1 rounded-full font-medium
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                {order.status}
              </span>

              <button className="flex items-center gap-x-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100 transition">
                <IconEye size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
