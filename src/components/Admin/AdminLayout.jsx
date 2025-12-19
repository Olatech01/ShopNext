"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar open={open} setOpen={setOpen} />

            <div className="flex-1">
                <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="font-semibold">Admin Panel</h2>
                    <button onClick={() => setOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>

                <main className="p-6 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
