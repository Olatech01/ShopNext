"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const banners = [
  {
    id: 1,
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    image: "/iphone.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    button: "Shop Now",
    bg: "bg-black",
  },
  {
    id: 2,
    title: "GP11 Shooter USB Gamepad",
    subtitle: "New Arrivals — Up to 20% Off",
    image: "/joystick.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    button: "Shop Now",
    bg: "bg-black",
  },
  {
    id: 3,
    title: "Macbook Pro 2024",
    subtitle: "Power You Need — Save Up to 15%",
    image: "/laptop.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    button: "Shop Now",
    bg: "bg-black",
  },
];


export default function Hero() {
  return (
    <div className="flex items-center justify-center px-6 py-14">
      {/* LEFT SIDEBAR */}
      <div className="grid grid-cols-12 gap-4 md:w-[1172px] w-full mt-6 ">

        <div className="col-span-3 md:block hidden border-r pr-4">
          <ul className="space-y-4 text-[15px]  font-medium">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between cursor-pointer hover:text-red-500"
              >
                {cat}
                <span className="text-gray-500">›</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SWIPER BANNER */}
        <div className="md:col-span-9 col-span-full">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            className="rounded-xl overflow-hidden"
          >
            {banners.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={`relative text-white h-[330px] w-full flex items-center px-16 rounded-xl ${item.bg}`}>
                  <div className="items-center justify-end block md:hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute md:hidden block right-10 bottom-0 h-[300px] items-end object-contain"
                    />
                  </div>
                  <div className="flex flex-col z-50 gap-3">
                    <img src={item.logo} alt="brand-logo" className="w-8 opacity-90" />
                    <p className="text-lg">{item.title}</p>

                    <h1 className="text-4xl font-bold leading-tight">
                      {item.subtitle.split("—")[0]} <br /> {item.subtitle.split("—")[1] || ""}
                    </h1>

                    <button className="mt-4 border-b border-white w-fit pb-1 flex items-center gap-2 hover:text-red-400">
                      {item.button} →
                    </button>
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute md:block hidden right-10 bottom-0 h-[300px] items-end object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
}
