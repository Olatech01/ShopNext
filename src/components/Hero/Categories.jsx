import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Categories = () => {
    return (
        <div className="flex items-center justify-center px-6 py-14">
            <div className="relative md:w-[1172px] flex md:flex-row flex-col md:justify-between bg-[#000000] min-h-[500px] px-8 md:items-center justify-center w-full overflow-hidden">

                {/* ==== JBL BACKGROUND IMAGE (visible on small screens only) ==== */}
                <motion.div
                    className="absolute inset-0 md:hidden flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image
                        src="/jbl.svg"
                        alt="jbl"
                        width={500}
                        height={500}
                        className="object-contain"
                    />
                </motion.div>

                {/* ==== LEFT TEXT ==== */}
                <motion.div
                    className="flex flex-col gap-7 z-10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h3 className='text-[16px] font-semibold text-[#00FF66]'>
                        Categories
                    </h3>

                    <h2 className='md:text-[48px] font-semibold text-white md:leading-14 leading-12 text-[32px]'>
                        Enhance Your <br /> Music Experience
                    </h2>

                    <button className="bg-[#00FF66] w-[170px] text-[16px] font-semibold cursor-pointer text-white h-[40px] md:h-[56px]">
                        Buy Now!
                    </button>
                </motion.div>

                {/* ==== JBL IMAGE (visible on md+ screens only) ==== */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="hidden md:block"
                >
                    <motion.div
                        animate={{ x: [0, 20, 0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image height={600} width={600} src={"/jbl.svg"} alt='jbl' />
                    </motion.div>
                </motion.div>

            </div>
        </div>
    )
}

export default Categories
