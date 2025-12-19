"use client";

import React from "react";
import { Package } from "lucide-react";

const orders = [
  {
    id: 1,
    name: "ABHISHEK SRIVASTAV",
    address:
      "Village and Post Kahi Bhiti, Bhiti, Uttar Pradesh, India, 224132",
    items: 0,
    amount: 10,
    method: "COD",
    payment: "Pending",
    date: "12/14/2025",
    status: "Delivered",
    product: null,
  },
  {
    id: 2,
    product: "Kid Tapered Slim Fit Trouser x 1 M",
    name: "Shafi Ullah",
    address:
      "Stadium Road Rawalpindi, Rawalpindi, Pakistan, 00000",
    items: 1,
    amount: 50,
    method: "COD",
    payment: "Pending",
    date: "12/14/2025",
    status: "Order Placed",
  },
  {
    id: 3,
    product: "Kid Tapered Slim Fit Trouser x 1 M",
    name: "him hbbh",
    address: "asdada, dsfdfads, dsfsf, 0",
    items: 1,
    amount: 48,
    method: "COD",
    payment: "Pending",
    date: "12/14/2025",
    status: "Order Placed",
  },
];

const Order = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Order Page</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-md p-6 flex gap-6 items-start"
          >
            {/* Icon */}
            <div className="w-14 h-14 border border-gray-300 flex items-center justify-center text-gray-600">
              <Package size={28} />
            </div>

            {/* Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Left Info */}
              <div className="md:col-span-2 space-y-1 text-sm">
                {order.product && (
                  <p className="font-medium">{order.product}</p>
                )}
                <p className="font-semibold">{order.name}</p>
                <p className="text-gray-600 w-1/2">{order.address}</p>
              </div>

              {/* Order Meta */}
              <div className="text-sm space-y-1">
                <p>Items : {order.items}</p>
                <p>Method : {order.method}</p>
                <p>Payment : {order.payment}</p>
                <p>Date : {order.date}</p>
              </div>

              {/* Amount + Status */}
              <div className="flex flex-col items-start gap-3">
                <p className="font-semibold">${order.amount}</p>

                <select className="border border-gray-300 outline-0 px-3 py-2 rounded-md text-sm">
                  <option>Order Placed</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
