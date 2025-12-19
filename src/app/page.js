"use client"
import Categories from "@/components/Hero/Categories";
import Features from "@/components/Hero/Features";
import Hero from "@/components/Hero/Hero";
import ThisMonth from "@/components/Hero/ThisMonth";
import Today from "@/components/Hero/Today";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Today />
      <ThisMonth />
      <Categories />
      <Features />
    </div>
  );
}
