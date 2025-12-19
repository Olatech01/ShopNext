"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, List, ShoppingBag, X, User, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Sidebar = ({ open, setOpen }) => {
    const pathname = usePathname();

    const menu = [
        { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
        { name: "Add Items", path: "/admin/addItems", icon: <PlusSquare size={20} /> },
        { name: "List Items", path: "/admin/listItems", icon: <List size={20} /> },
        { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={20} /> },
        { name: "Users", path: "/admin/users", icon: <User size={20} /> },
    ];


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        window.location.href = "/auth";
    }

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <h2 className="text-lg font-semibold">Admin Panel</h2>
                    <button className="lg:hidden" onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-2">
                    {menu.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition
                ${isActive
                                        ? "bg-black text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

            </aside>
            <div className="absolute bottom-0 p-4">
                <button onClick={handleLogout} className=" border border-gray-300 cursor-pointer w-64 flex items-center gap-3 px-4 py-2 rounded-md transition">
                    <LogOut />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );
};

export default Sidebar;
