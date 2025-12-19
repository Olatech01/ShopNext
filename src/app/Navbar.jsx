"use client"
import { Heart, Search, ShoppingCart, User, LogOut, User2, Settings, List } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

const Navbar = () => {
    const router = useRouter()
    const [userDrop, setUserDrop] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
    const dropRef = useRef(null)

    // Function to update cart count
    const updateCartCount = () => {
        if (typeof window !== "undefined") {
            const cart = localStorage.getItem('cart');
            const cartItems = cart ? JSON.parse(cart) : [];
            const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
            setCartCount(count);
        }
    };

    // Update cart count on component mount and when cart is updated
    useEffect(() => {
        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, [])

    // CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        const handler = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setUserDrop(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div className='flex items-center h-[80px] sticky inset-0 z-50 w-full bg-white justify-between px-10'>
            <h1 className='text-[24px] font-bold'>ShopNest</h1>

            {/* NAV LINKS */}
            <ul className='md:flex hidden gap-10 text-[16px] font-normal'>
                <Link href={"/"}><li className='cursor-pointer'>Home</li></Link>
                <Link href={"/contact"}><li className='cursor-pointer'>Contact</li></Link>
                <Link href={"/about"}><li className='cursor-pointer'>About</li></Link>
                <Link href={"/auth"}><li className='cursor-pointer'>Sign-Up</li></Link>
            </ul>

            {/* RIGHT SIDE ICONS */}
            <div className='flex items-center gap-4 relative' ref={dropRef}>
                <div className='flex bg-[#F5F5F5] h-[40px] items-center w-[250px] rounded-[8px] px-3'>
                    <input type="text" placeholder='What are you looking for?' className='outline-0 w-full bg-transparent' />
                    <Search size={16} />
                </div>

                <Heart onClick={() => router.push("/waitlist")} className='cursor-pointer' size={18} />
                <div className='relative'>
                    <ShoppingCart onClick={() => router.push("/cart")} className='cursor-pointer' size={18} />
                    {cartCount > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </div>

                {/* USER ICON */}
                <User 
                    size={18} 
                    onClick={() => setUserDrop(!userDrop)} 
                    className='cursor-pointer'
                />

                {/* ==== DROPDOWN MENU ==== */}
                {userDrop && (
                    <div className='absolute top-[60px] right-0 shadow-xl border rounded-xl bg-white w-[220px] p-4 flex flex-col gap-3 z-50 animate-fadeIn'>
                        {/* Pointer arrow */}
                        <div className="absolute -top-2 right-4 w-3 h-3 bg-[#000000]/4 border-l border-t rotate-45"></div>

                        {/* If NOT logged in */}
                        {!user && (
                            <>
                                <Link href="/auth" className='flex items-center gap-3 py-2 hover:text-red-500'>
                                    <User2 size={16} /> Login
                                </Link>
                                <Link href="/auth/register" className='flex items-center gap-3 py-2 hover:text-red-500'>
                                    <User2 size={16} /> Create Account
                                </Link>
                            </>
                        )}

                        {/* If Logged in */}
                        {user && (
                            <>
                                <Link href="/profile" className='flex items-center gap-3 py-2 hover:text-red-500'>
                                    <User2 size={16} /> Profile
                                </Link>
                                <Link href="/orders" className='flex items-center gap-3 py-2 hover:text-red-500'>
                                    <List size={16} /> Orders
                                </Link>
                                <Link href="/settings" className='flex items-center gap-3 py-2 hover:text-red-500'>
                                    <Settings size={16} /> Settings
                                </Link>
                                <button 
                                    onClick={() => {
                                        localStorage.removeItem("user")
                                        localStorage.removeItem("token")
                                        router.push("/auth")
                                        setUserDrop(false)
                                    }}
                                    className='flex items-center gap-3 py-2 hover:text-red-500 text-left w-full'
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Navbar
