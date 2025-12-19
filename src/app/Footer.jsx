import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#000000] h-[440px] flex items-center justify-center px-4 w-full'>
      <div className='md:w-[1172px] w-full md:flex text-white md:justify-between grid grid-cols-2 gap-6'>
        <div className='space-y-6'>
          <h2 className='text-[24px] font-bold'>
            Exclusive
          </h2>
          <div className='text-[16px] font-normal space-y-3'>
            <h2>Subscribe</h2>
            <p>
              Get 10% off your first order
            </p>
            <div className='border px-2 flex items-center justify-between h-[48px]'>
              <input type="text" className='outline-0 placeholder:text-gray-400' placeholder='Enter your email'/>
            </div>
          </div>
        </div>
        <div className='space-y-6'>
          <h2 className='text-[20px] font-medium'>
            Support
          </h2>
          <ul className='text-[16px] font-normal space-y-3'>
            <li>
              111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.
            </li>
            <li>
              exclusive@gmail.com
            </li>
            <li>
              +88015-88888-9999
            </li>
          </ul>
        </div>
        <div className='space-y-6'>
          <h2 className='text-[20px] font-medium'>
            Account
          </h2>
          <ul className='text-[16px] font-normal space-y-3'>
            <li>
              My Accountx
            </li>
            <li>
              Login / Register
            </li>
            <li>
              Cart
            </li>
            <li>
              Wishlist
            </li>
            <li>
              Shop
            </li>
          </ul>
        </div>
        <div className='space-y-6'>
          <h2 className='text-[20px] font-medium'>
            Quick Link
          </h2>
          <ul className='text-[16px] font-normal space-y-3'>
            <li>
              Privacy Policy
            </li>
            <li>
              Terms Of Use
            </li>
            <li>
              FAQ
            </li>
            <li>
              Contact
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer