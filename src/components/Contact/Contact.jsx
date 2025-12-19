import Image from 'next/image'
import React from 'react'

const Contact = () => {
    return (
        <div className='flex items-center justify-center flex-col py-20 px-4 gap-8'>
            <div className='md:w-[1172px] w-full'>
                <h2 className='text-[14px] font-normal'>
                    Home / <span className='text-[18px] font-medium'>Contact</span>
                </h2>
            </div>
            <div className='flex md:flex-row flex-col gap-8 w-full justify-center'>
                <div className='md:w-[340px] rounded-[10px] w-full flex flex-col justify-center gap-8 shadow-2xl shadow-gray-200 px-6 py-8'>
                    <div className='flex flex-col gap-3.5'>
                        <div className='flex items-center gap-3'>
                            <Image height={40} width={40} src={"/phone.svg"} alt='' />
                            <span className='text-[14px] font-normal'>
                                Call To Us
                            </span>
                        </div>
                        <p className='text-[14px] font-normal'>
                            We are available 24/7, 7 days a week.
                        </p>
                        <p className='text-[14px] font-normal'>
                            Phone: +8801611112222
                        </p>
                    </div>
                    <div className='flex flex-col gap-3.5'>
                        <div className='flex items-center gap-3'>
                            <Image height={40} width={40} src={"/mail.svg"} alt='' />
                            <span className='text-[14px] font-normal'>
                                Write To Us
                            </span>
                        </div>
                        <p className='text-[14px] font-normal'>
                            Fill out our form and we will contact you within 24 hours.
                        </p>
                        <p className='text-[14px] font-normal'>
                            Emails: customer@exclusive.com
                        </p>
                        <p className='text-[14px] font-normal'>
                            Emails: support@exclusive.com
                        </p>
                    </div>
                </div>
                <div className='md:w-[800px] rounded-[10px] w-full shadow-2xl shadow-gray-200 px-6 py-8'>
                    <form className='flex flex-col gap-6'>
                        <div className='grid md:grid-cols-3 gap-5 grid-cols-1'>
                            <input type="text" placeholder='Your Name' className='bg-[#F5F5F5] p-2 rounded-[5px] outline-0 h-[50px]' />
                            <input type="text" placeholder='Your Email' className='bg-[#F5F5F5] p-2 rounded-[5px] outline-0 h-[50px]' />
                            <input type="text" placeholder='Your Phone' className='bg-[#F5F5F5] p-2 rounded-[5px] outline-0 h-[50px]' />
                        </div>
                        <textarea name="" id="" placeholder='Your Message' className='min-h-[207px] bg-[#F5F5F5] outline-0 rounded-[10px] p-2 w-full'></textarea>
                        <div className='flex items-center justify-end'>
                            <button className='bg-[#DB4444] text-white text-[16px] font-medium h-[56px] w-[215px]'>
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact