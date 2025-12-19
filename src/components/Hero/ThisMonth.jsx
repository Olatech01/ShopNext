import { Eye, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ThisMonth = () => {
    const forYou = [
        { name: "The north coat", price: "$960", image: "/pink.svg", discount: "" },
        { name: "Gucci duffle bag", price: "$1160", image: "/gucci.svg", discount: "" },
        { name: "RGB liquid CPU Cooler", price: "$560", image: "/speaker.svg", discount: "" },
        { name: "Small BookSelf", price: "$200", image: "/self.svg", discount: "" },
    ]


    return (
        <div className="flex items-center justify-center px-6 py-14">
            <div className="md:w-[1172px] flex flex-col items-center w-full">
                <div className='flex items-center justify-between w-full'>
                    <h2 className='flex items-center gap-3'>
                        <span className='mr-1 bg-[#DB4444] rounded-sm h-[40px] w-[20px]' />
                        <span className='text-[20px] font-medium text-[#DB4444]'>
                            This Month
                        </span>
                    </h2>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='text-[36px] font-semibold'>
                        Best Selling Products
                    </h2>
                    <button className="bg-[#DB4444] w-[160px] cursor-pointer text-white px-10 py-4">
                        View All
                    </button>
                </div>
                <div className='grid grid-cols-1 w-full mt-10 md:grid-cols-4  gap-6'>
                    {forYou.map((list, index) => (
                        <div key={index} className='flex flex-col gap-2'>
                            <div className='bg-[#F5F5F5] flex flex-col pt-3 justify-between rounded-[10px] items-center min-h-[250px]'>
                                <div className='flex items-center px-4 justify-end w-full'>
                                    <button className='h-[34px] w-[34px] flex items-center justify-center cursor-pointer rounded-full bg-white'>
                                        <Eye />
                                    </button>
                                </div>
                                <Image height={100} width={100} src={list.image} className='md:w-[190px] w-[60%]' alt='' />
                                <button className='w-full flex items-center justify-center cursor-pointer gap-2.5 rounded-b-[10px] bg-[#000000] md:h-[40px] h-[60px] text-white text-[16px] font-normal'>
                                    <ShoppingCart size={16} />
                                    Add To Cart
                                </button>
                            </div>
                            <h2 className='text-[16px] font-medium'>
                                {list.name}
                            </h2>
                            <span className='text-[#DB4444] text-[16px] font-medium'>
                                {list.price}
                            </span>
                        </div>
                    ))}
                </div>
                <button className="bg-[#DB4444] w-[224px] mt-10 cursor-pointer text-white px-10 py-4">
                    View All Products
                </button>
            </div>
        </div>
    )
}

export default ThisMonth