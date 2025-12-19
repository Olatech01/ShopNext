import Image from "next/image";
import React from "react";

const Features = () => {
    return (
        <div className="flex items-center justify-center px-6 py-14">
            <div className="max-w-[1172px] w-full flex flex-col gap-10">

                {/* ==== HEADER ==== */}
                <div>
                    <h2 className="flex items-center gap-3">
                        <span className="bg-[#DB4444] rounded-sm h-[40px] w-[20px]" />
                        <span className="text-[20px] font-semibold text-[#DB4444]">
                            Featured
                        </span>
                    </h2>

                    <h2 className="text-[36px] mt-6 font-semibold">New Arrival</h2>
                </div>

                {/* ==== GRID SECTION ==== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* === PS5 Large Left === */}
                    <div className="relative bg-black rounded-xl overflow-hidden h-[600px] flex">
                        <Image
                            src="/ps5.svg" // change to your image
                            alt="PS5"
                            fill
                            className="object-cover opacity-90"
                        />

                        <div className="absolute bottom-10 left-10 text-white">
                            <h3 className="text-[24px] font-semibold">PlayStation 5</h3>
                            <p className="text-[14px] mt-2 opacity-80 max-w-[250px]">
                                Black and White version of the PS5 coming out on sale.
                            </p>
                            <button className="mt-3 underline">Shop Now</button>
                        </div>
                    </div>

                    {/* === RIGHT SIDE COLUMN (3 small cards stacked) === */}
                    <div className="flex flex-col gap-6">

                        {/* === Women's Collections === */}
                        <div className="relative bg-[#0D0D0D] rounded-xl h-[284px] overflow-hidden">
                            <Image
                                src="/woman.svg" // change to your image
                                alt="Women's Collection"
                                fill
                                className="object-cover opacity-50"
                            />

                            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white">
                                <h3 className="text-[24px] font-semibold">
                                    Women’s Collections
                                </h3>
                                <p className="text-[14px] mt-2 opacity-90 max-w-[250px]">
                                    Featured woman collections that give you another vibe.
                                </p>
                                <button className="mt-3 underline">Shop Now</button>
                            </div>
                        </div>

                        {/* === Bottom cards grid === */}
                        <div className="grid grid-cols-2 gap-6">

                            {/* === Speakers === */}
                            <div className="relative bg-[#0D0D0D] rounded-xl h-[284px] overflow-hidden">
                                <Image
                                    src="/mp.svg"
                                    alt="Speakers"
                                    fill
                                    className="opacity-60 w-[170px]"
                                />

                                <div className="absolute left-6 bottom-6 text-white">
                                    <h3 className="text-[20px] font-semibold">Speakers</h3>
                                    <p className="text-[14px] opacity-80">Amazon wireless speakers</p>
                                    <button className="mt-2 underline">Shop Now</button>
                                </div>
                            </div>

                            {/* === Perfume === */}
                            <div className="relative bg-[#0D0D0D] rounded-xl h-[284px] overflow-hidden">
                                <Image
                                    src="/perfume.svg"
                                    alt="Perfume"
                                    fill
                                    className="opacity-60 w-[170px]"
                                />

                                <div className="absolute left-6 bottom-6 text-white">
                                    <h3 className="text-[20px] font-semibold">Perfume</h3>
                                    <p className="text-[14px] opacity-80">GUCCI INTENSE OUD EDP</p>
                                    <button className="mt-2 underline">Shop Now</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Features;
