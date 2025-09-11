// import { IconEye, IconX } from "@tabler/icons-react";
// import React, { useState } from "react";

// const orders = [
//   {
//     product: "Premium Wireless Headphones",
//     id: "#ORD-001",
//     date: "2024-01-15",
//     price: 299,
//     status: "Delivered",
//   },
//   {
//     product: "Smart Watch Series 5",
//     id: "#ORD-002",
//     date: "2024-01-12",
//     price: 399,
//     status: "Shipped",
//   },
//   {
//     product: "Bluetooth Speaker",
//     id: "#ORD-003",
//     date: "2024-01-10",
//     price: 99,
//     status: "Processing",
//   },
// ];

// const OrderHistory = () => {
//   const [showpopup, setshowpopup] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   return (
//     <div className="bg-white m-5 lg:m-10 px-6 py-8 rounded-2xl border border-gray-200 shadow-sm">
//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h1 className="font-bold text-3xl text-gray-800">Order History</h1>
//         <p className="text-gray-500 text-sm mt-1">
//           A quick view of all your past purchases
//         </p>
//       </div>

//       {/* Orders List */}
//       <div className="flex flex-col gap-y-5">
//         {orders.map((order, index) => (
//           <div
//             key={index}
//             className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl px-6 py-5 bg-gray-50 hover:bg-gray-100 transition">
//             {/* Product Info */}
//             <div>
//               <h2 className="font-semibold text-lg text-gray-800">
//                 {order.product}
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">
//                 {order.id} • {order.date}
//               </p>
//             </div>

//             {/* Right Side */}
//             <div className="flex items-center gap-x-4 mt-4 sm:mt-0">
//               <span className="font-semibold text-lg text-gray-700">
//                 ${order.price}
//               </span>

//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium
//                   ${
//                     order.status === "Delivered"
//                       ? "bg-green-100 text-green-700"
//                       : order.status === "Shipped"
//                       ? "bg-purple-100 text-purple-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}>
//                 {order.status}
//               </span>

//               <button
//                 onClick={() => {
//                   setshowpopup(true);
//                   setSelectedOrder(order);
//                 }}
//                 className="flex items-center gap-x-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-white hover:shadow-sm transition">
//                 <IconEye size={16} /> View
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Popup */}
//       {showpopup && selectedOrder && (
//         <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
//           <div className="flex flex-col border bg-white border-gray-200 shadow-lg w-[320px] sm:w-[500px] px-6 py-6 rounded-2xl relative">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="font-semibold text-xl text-gray-800">
//                 Order Details
//               </h1>
//               <IconX
//                 size={24}
//                 className="cursor-pointer text-gray-500 hover:text-gray-700"
//                 onClick={() => {
//                   setshowpopup(false);
//                   setSelectedOrder(null);
//                 }}
//               />
//             </div>

//             <p className="text-gray-500 text-sm mb-5">
//               Details of your selected order
//             </p>

//             {/* Order Info */}
// <div className="space-y-3">
//   <p className="text-gray-700">
//     <span className="font-medium">Product:</span>{" "}
//     {selectedOrder.product}
//   </p>
//   <p className="text-gray-700">
//     <span className="font-medium">Order ID:</span>{" "}
//     {selectedOrder.id}
//   </p>
//   <p className="text-gray-700">
//     <span className="font-medium">Date:</span> {selectedOrder.date}
//   </p>
//   <p className="text-gray-700">
//     <span className="font-medium">Price:</span> $
//     {selectedOrder.price}
//   </p>
//   <p>
//     <span className="font-medium text-gray-700">Status:</span>{" "}
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-medium
//         ${
//           selectedOrder.status === "Delivered"
//             ? "bg-green-100 text-green-700"
//             : selectedOrder.status === "Shipped"
//             ? "bg-purple-100 text-purple-700"
//             : "bg-yellow-100 text-yellow-700"
//         }`}>
//       {selectedOrder.status}
//     </span>
//   </p>
// </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;

import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

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

              <button
                onClick={() => {
                  setshowpopup(true);
                  setSelectedOrder(order);
                }}
                className="flex items-center gap-x-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100 transition">
                <IconEye size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
      {showpopup && selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
          <div className="flex flex-col border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[400px] px-5 py-6 rounded-xl relative">
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
                <button
                  onClick={() => {
                    setshowpopup(false);
                    setSelectedOrder(null);
                  }}
                  className="flex items-center justify-center cursor-pointer text-white mt-3 w-full gap-x-2 bg-purple-700 rounded-lg px-3 py-2">
                  <IconEyeOff size={16} /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
