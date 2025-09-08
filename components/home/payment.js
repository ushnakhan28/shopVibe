// components/PaymentMethods.jsx

import { IconCreditCard, IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";

const cards = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/26", default: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "09/25", default: false },
];

const PaymentMethods = () => {
  return (
    <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-bold text-2xl sm:text-3xl">Payment Methods</h1>
          <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
            Manage your payment options
          </p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
          + Add Card
        </button>
      </div>

      <div className="space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <IconCreditCard className="text-gray-600" />
              <div>
                <h2 className="font-medium">
                  {card.type} ending in {card.last4}
                  {card.default && (
                    <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
              </div>
            </div>

            <div className="flex gap-x-2 mt-3 sm:mt-0">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <IconEdit size={18} />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <IconTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
