"use client";
import React, { useEffect, useState } from "react";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";

const Hero = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    productCount: 0,
    orderCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://e-backend-1xjt.onrender.com/api/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setStats({
        userCount: data.userCount || 0,
        productCount: data.productCount || 0,
        orderCount: data.orderCount || 0,
      });
    } catch (err) {
      setError(err.message || "Failed to load stats");
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { label: "Total Revenue", value: "$12,450", icon: <DollarSign size={26} /> },
    { label: "Total Users", value: stats.userCount || 0, icon: <Users size={26} /> },
    { label: "Total Orders", value: stats.orderCount || 0, icon: <ShoppingCart size={26} /> },
    { label: "Total Products", value: stats.productCount || 0, icon: <Package size={26} /> },
  ];

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-300 h-[120px] rounded-lg p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
