import { Eye, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";


const Waitlist = () => {
  const waitlist = [
    { name: "Gucci duffle bag", price: "$960", image: "/gucci.svg", discount: "" },
    { name: "RGB liquid CPU Cooler", price: "$1960", image: "/cpu.svg", discount: "" },
    { name: "GP11 Shooter USB Gamepad", price: "$550", image: "/joystick.svg", discount: "" },
    { name: "Quilted Satin Jacket", price: "$750", image: "/jacket.svg", discount: "" },
  ]

  const forYou = [
    { name: "ASUS FHD Gaming Laptop", price: "$960", image: "/laptop.svg", discount: "" },
    { name: "IPS LCD Gaming Monitor", price: "$1160", image: "/lcd.svg", discount: "" },
    { name: "HAVIT HV-G92 Gamepad", price: "$560", image: "/gamepad.svg", discount: "" },
    { name: "AK-900 Wired Keyboard", price: "$200", image: "/keyboard.svg", discount: "" },
  ]



  return (
    <div className="flex items-center justify-center px-6 py-14">
      <div className="md:w-[1172px] w-full">
        <div className='flex items-center justify-between'>
          <h2 className='text-[20px] font-medium text-black'>
            Wishlist
            <span className='ml-1'>
              ({waitlist.length})
            </span>
          </h2>
          <button className='border border-[#000000]/50 h-[56px] text-[16px] font-medium cursor-pointer w-[223px]'>
            Move All To Bag
          </button>
        </div>
        <div className='grid grid-cols-1 mt-10 md:grid-cols-4  gap-6'>
          {waitlist.map((list, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <div className='bg-[#F5F5F5] flex flex-col pt-3 justify-between rounded-[10px] items-center min-h-[250px]'>
                <div className='flex items-center px-4 justify-end w-full'>
                  <button className='h-[34px] w-[34px] flex items-center justify-center cursor-pointer rounded-full bg-white'>
                    <RiDeleteBin6Line />
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
        <div className='mt-20'>
          <div className='flex items-center justify-between'>
            <h2 className='flex items-center gap-3'>
              <span className='mr-1 bg-[#DB4444] rounded-sm h-[40px] w-[20px]' />
              <span className='text-[20px] font-medium text-black'>
                Just For You
              </span>
            </h2>
            <button className='border border-[#000000]/50 h-[56px] text-[16px] font-medium cursor-pointer w-[150px]'>
              See All
            </button>
          </div>
          <div className='grid grid-cols-1 mt-10 md:grid-cols-4  gap-6'>
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
        </div>
      </div>
    </div>
  )
}

export default Waitlist