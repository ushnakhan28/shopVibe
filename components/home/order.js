import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import FullWidthBtn from "./fullWidthBtn";

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
  const [showpopup, setshowpopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setloading] = useState(false);

  return (
    <div className="bg-[#fcfcfc] m-5 lg:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-lg border border-[#e0e0e0] shadow-sm">
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
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-lg px-5 py-4 bg-white hover:shadow-md transition">
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

              <button
                onClick={() => {
                  setshowpopup(true);
                  setSelectedOrder(order);
                }}
                className="flex cursor-pointer items-center gap-x-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100 transition">
                <IconEye size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
      {showpopup && selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
          <div className="flex flex-col border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[400px] px-5 py-6 rounded-lg relative">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-2xl">Order Details</h1>
              <IconX
                size={25}
                color="#7e22ce"
                className="cursor-pointer"
                onClick={() => {
                  setshowpopup(false);
                  setSelectedOrder(null);
                }}
              />
            </div>
            <p className="text-[#616161] text-sm mb-4">
              View items and shipping details.
            </p>
            <div>
              <div className="space-y-3">
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : selectedOrder.status === "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Product:</span>{" "}
                  {selectedOrder.product}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Order ID:</span>{" "}
                  {selectedOrder.id}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date:</span>{" "}
                  {selectedOrder.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Price:</span> $
                  {selectedOrder.price}
                </p>
              </div>
              <div className="font-semibold tracking-[1.5px]">
                <FullWidthBtn
                  text="Close"
                  icon={<IconEyeOff size={20} />}
                  loading={loading}
                  onClick={() => {
                    setloading(true);
                    setTimeout(() => {
                      setshowpopup(false);
                      setSelectedOrder(null);
                      setloading(false);
                    }, 2000);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
