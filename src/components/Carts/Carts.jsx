"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const Carts = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load cart from localStorage on mount
    useEffect(() => {
        loadCart();
        window.addEventListener('cartUpdated', loadCart);
        return () => window.removeEventListener('cartUpdated', loadCart);
    }, []);

    const loadCart = () => {
        try {
            const cart = localStorage.getItem('cart');
            const items = cart ? JSON.parse(cart) : [];
            setCartItems(items);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load cart:', err);
            setLoading(false);
        }
    };

    // Update quantity
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map(item =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Remove item from cart
    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('Item removed from cart');
    };

    // Clear cart
    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            setCartItems([]);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success('Cart cleared');
        }
    };

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const shipping = subtotal > 0 ? 0 : 0; // Free shipping
    const total = subtotal + shipping;

    if (loading) {
        return <div className="flex items-center justify-center px-6 py-14">Loading cart...</div>;
    }

    return (
        <div className="flex items-center justify-center px-6 py-14">
            <div className="md:w-[1172px] w-full">
                <div className="text-sm text-gray-400 mb-10">
                    Home / <span className="text-black">Cart</span>
                </div>

                <div className=" flex flex-col gap-6 rounded-sm mb-12">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">Your cart is empty</p>
                            <Link href="/">
                                <button className="mt-4 bg-[#DB4444] text-white px-6 py-2">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 md:px-8 px-2.5 py-6 rounded-[10px] shadow text-gray-500 font-medium">
                                <div>Product</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Subtotal</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item._id} className="grid grid-cols-4 items-center md:px-8 px-2.5 py-6 rounded-[10px] shadow-lg">
                                    <div className="flex md:flex-row flex-col items-center md:gap-4">
                                        <button
                                            onClick={() => handleRemoveItem(item._id)}
                                            className="w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        <img
                                            src={item.images && item.images[0] ? `https://e-backend-1xjt.onrender.com${item.images[0]}` : "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover"
                                        />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <div>${item.price}</div>
                                    <div>
                                        <input
                                            type="number"
                                            value={item.quantity || 1}
                                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                                            className="w-16 border px-2 py-1 text-center outline-0"
                                            min="1"
                                        />
                                    </div>
                                    <div>${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="flex justify-between mb-14">
                    <Link href="/">
                        <button className="border cursor-pointer px-6 py-3 hover:bg-gray-100">
                            Return To Shop
                        </button>
                    </Link>
                    {cartItems.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="border cursor-pointer px-6 py-3 hover:bg-gray-100"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="flex justify-between gap-10 flex-wrap">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="border px-4 py-3 h-fit w-64"
                            />
                            <button className="bg-[#DB4444] cursor-pointer h-fit text-white px-6 py-3 hover:bg-red-600">
                                Apply Coupon
                            </button>
                        </div>

                        <div className="border p-8 w-full md:max-w-sm">
                            <h2 className="text-lg font-semibold mb-6">Cart Total</h2>

                            <div className="flex justify-between mb-4 text-sm">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between mb-4 text-sm border-b pb-4">
                                <span>Shipping:</span>
                                <span className="text-gray-400">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>

                            <div className="flex justify-between font-semibold mb-6">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <Link href={"/checkout"}>
                                <button className="w-full cursor-pointer bg-[#DB4444] text-white py-3 hover:bg-red-600">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carts;
