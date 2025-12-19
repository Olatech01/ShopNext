import { Eye, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const Today = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const forYou = [
        { name: "ASUS FHD Gaming Laptop", price: "$960", image: "/laptop.svg", discount: "" },
        { name: "IPS LCD Gaming Monitor", price: "$1160", image: "/lcd.svg", discount: "" },
        { name: "HAVIT HV-G92 Gamepad", price: "$560", image: "/gamepad.svg", discount: "" },
        { name: "AK-900 Wired Keyboard", price: "$200", image: "/keyboard.svg", discount: "" },
        { name: "Gucci duffle bag", price: "$960", image: "/gucci.svg", discount: "" },
        { name: "RGB liquid CPU Cooler", price: "$1960", image: "/cpu.svg", discount: "" },
        { name: "GP11 Shooter USB Gamepad", price: "$550", image: "/joystick.svg", discount: "" },
        { name: "Quilted Satin Jacket", price: "$750", image: "/jacket.svg", discount: "" },
    ]

    // Create a fixed end date when component mounts
    const [endDate] = useState(() => {
        const end = new Date();
        end.setDate(end.getDate() + 3);        // +3 days
        end.setHours(23, 19, 56, 0);           // Set to 23:19:56.000
        return end;
    });

    const calculateTimeLeft = () => {
        const difference = endDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
                minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
            };
        } else {
            timeLeft = { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);


    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch('https://e-backend-1xjt.onrender.com/api/products', {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch products');
            }

            setProducts(data.products || []);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching products');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        try {
            // Get existing cart from localStorage
            const existingCart = localStorage.getItem('cart');
            const cart = existingCart ? JSON.parse(existingCart) : [];

            // Check if product already exists in cart
            const existingProduct = cart.find(item => item._id === product._id);

            if (existingProduct) {
                // Increase quantity if product exists
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            } else {
                // Add new product with quantity 1
                cart.push({
                    ...product,
                    quantity: 1
                });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Dispatch custom event to update Navbar
            window.dispatchEvent(new Event('cartUpdated'));

            toast.success(`${product.name} added to cart!`);
        } catch (err) {
            toast.error('Failed to add item to cart');
            console.error('Add to cart error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center px-6 py-14">
            <div className="md:w-[1172px] flex flex-col items-center w-full">
                <div className='flex items-center justify-between w-full'>
                    <h2 className='flex items-center gap-3'>
                        <span className='mr-1 bg-[#DB4444] rounded-sm h-[40px] w-[20px]' />
                        <span className='text-[20px] font-medium text-[#DB4444]'>
                            Today’s
                        </span>
                    </h2>
                </div>
                <div className="flex items-center w-full gap-6 mt-6 font-bold">
                    <h2 className="text-3xl text-gray-900">Flash Sales</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-600 mb-1">Days</span>
                            <span className="text-3xl text-gray-800 font-bold bg-gray-100 px-3 py-2 rounded-md">
                                {timeLeft.days}
                            </span>
                        </div>
                        <span className="text-2xl text-red-500 animate-pulse mt-4">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-600 mb-1">Hours</span>
                            <span className="text-3xl text-gray-800 font-bold bg-gray-100 px-3 py-2 rounded-md">
                                {timeLeft.hours}
                            </span>
                        </div>
                        <span className="text-2xl text-red-500 animate-pulse mt-4">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-600 mb-1">Minutes</span>
                            <span className="text-3xl text-gray-800 font-bold bg-gray-100 px-3 py-2 rounded-md">
                                {timeLeft.minutes}
                            </span>
                        </div>
                        <span className="text-2xl text-red-500 animate-pulse mt-4">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-600 mb-1">Seconds</span>
                            <span className="text-3xl text-gray-800 font-bold bg-gray-100 px-3 py-2 rounded-md">
                                {timeLeft.seconds}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 w-full mt-10 md:grid-cols-4  gap-6'>
                    {products.map((product) => (
                        <div key={product._id} className='flex flex-col gap-2'>
                            <div className='bg-[#F5F5F5] flex flex-col pt-3 justify-between rounded-[10px] items-center min-h-[250px]'>
                                <div className='flex items-center px-4 justify-end w-full'>
                                    <button className='h-[34px] w-[34px] flex items-center justify-center cursor-pointer rounded-full bg-white'>
                                        <Eye />
                                    </button>
                                </div>
                                <Image height={100} width={100} src={`https://e-backend-1xjt.onrender.com${product.images[0]}`} className='' alt='' />
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className='w-full flex items-center justify-center cursor-pointer gap-2.5 rounded-b-[10px] bg-[#000000] md:h-[40px] h-[60px] text-white text-[16px] font-normal hover:bg-gray-800 transition'
                                >
                                    <ShoppingCart size={16} />
                                    Add To Cart
                                </button>
                            </div>
                            <h2 className='text-[16px] font-medium'>
                                {product.name}
                            </h2>
                            <span className='text-[#DB4444] text-[16px] font-medium'>
                                ${product.price}
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

export default Today