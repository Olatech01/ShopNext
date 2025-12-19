"use client"
import React from "react";

const Checkout = () => {
    return (
        <div className="flex items-center justify-center px-6 py-14">
            {/* Breadcrumb */}
            <div className="md:w-[1172px] w-full">
                <div className="text-sm text-gray-400 mb-12">
                    Account / My Account / Product / View Cart /{" "}
                    <span className="text-black">CheckOut</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* LEFT — Billing Details */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-8">Billing Details</h2>

                        <form className="space-y-6">
                            <input className="input" placeholder="First Name *" />
                            <input className="input" placeholder="Company Name" />
                            <input className="input" placeholder="Street Address *" />
                            <input className="input" placeholder="Apartment, floor, etc. (optional)" />
                            <input className="input" placeholder="Town/City *" />
                            <input className="input" placeholder="Phone Number *" />
                            <input className="input" placeholder="Email Address *" />

                            <label className="flex items-center gap-3 text-sm">
                                <input type="checkbox" checked readOnly className="accent-red-500" />
                                Save this information for faster check-out next time
                            </label>
                        </form>
                    </div>

                    {/* RIGHT — Order Summary */}
                    <div>
                        {/* Items */}
                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src="https://via.placeholder.com/40" alt="" />
                                    <span>LCD Monitor</span>
                                </div>
                                <span>$650</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src="https://via.placeholder.com/40" alt="" />
                                    <span>HI Gamepad</span>
                                </div>
                                <span>$1100</span>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="border-b py-4 flex justify-between">
                            <span>Subtotal:</span>
                            <span>$1750</span>
                        </div>

                        <div className="border-b py-4 flex justify-between">
                            <span>Shipping:</span>
                            <span className="text-gray-400">Free</span>
                        </div>

                        <div className="py-4 flex justify-between font-semibold mb-6">
                            <span>Total:</span>
                            <span>$1750</span>
                        </div>

                        {/* Payment */}
                        <div className="space-y-4 mb-8">
                            <label className="flex items-center gap-3">
                                <input type="radio" name="payment" />
                                Bank
                                <div className="flex gap-2 ml-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
                                </div>
                            </label>

                            <label className="flex items-center gap-3">
                                <input type="radio" name="payment" defaultChecked />
                                Cash on delivery
                            </label>
                        </div>

                        {/* Coupon */}
                        <div className="flex gap-4 mb-8">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="border px-4 py-3 w-full"
                            />
                            <button className="bg-[#DB4444] cursor-pointer text-white px-6 py-3 whitespace-nowrap">
                                Apply Coupon
                            </button>
                        </div>

                        {/* Place Order */}
                        <button className="bg-[#DB4444] cursor-pointer text-white px-10 py-4">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Reusable Tailwind input style */}
            <style jsx>{`
        .input {
          width: 100%;
          border: none;
          border-bottom: 1px solid #e5e7eb;
          padding: 14px 0;
          outline: none;
        }
        .input::placeholder {
          color: #9ca3af;
        }
      `}</style>
        </div>
    );
};

export default Checkout;
