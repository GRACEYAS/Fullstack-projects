import React, { useEffect, useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);

    const getCountry = async () => {
        var fetchData = await fetch("https://fakestoreapi.com/products");
        var result = await fetchData.json();
        setProducts(result);
        console.log(result);
    }

    useEffect(() => {
        getCountry();
    }, []);

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const increaseQty = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const decreaseQty = (id) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0); // remove if 0

        setCart(updatedCart);
    };

    const removeFromCart = (id) => {
        const deleteConfirm = window.confirm("Are you sure want to delete the item from cart?!!!");
        if (deleteConfirm) {
            const updatedCart = cart.filter((items, index) => index !== id)
            setCart(updatedCart)
        }
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);


    return (
        <div className=''>
            <div className='flex bg-gray-100 p-8 justify-between items-center shadow-md'>
                <img className='h-6 mr-2 md:h-12' src='https://www.meesho.com/assets/svgicons/meeshoLogo.svg' />
                <div className="flex items-center   bg-white  overflow-hidden w-[200px] lg:w-[600px]">
                    <input
                        type="text"
                        placeholder="Try Saree, Kurti or Search by Product Code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                    /></div>

                <div className='md:hidden cursor-pointer ml-2 mr-2' onClick={() => setOpenMenu(!openMenu)}>
                    <MenuIcon />
                </div>

                {openMenu && (
                    <div className='md:hidden mt-3 px-3'>
                        <div className='flex flex-col gap-3'>

                            <div className='flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-cyan-50 cursor-pointer'>
                                <FavoriteBorderIcon className='text-red-600' />
                                <span>Wishlist</span>
                            </div>

                            <button className='w-full bg-red-800 hover:bg-red-900 text-white rounded px-4 py-2 text-center cursor-pointer'>
                                Sign up
                            </button>

                            <button className='w-full bg-red-800 hover:bg-red-900 text-white rounded px-4 py-2 flex items-center gap-2 cursor-pointer'>
                                <PersonIcon />
                                Login
                            </button>

                            <div className='flex flex-col items-center gap-2 w-full px-4 py-2 text-black text-lg cursor-pointer'>
                                <ShoppingBagIcon />
                                <span>Cart ({cart.length})</span>
                            </div>

                        </div>
                    </div>
                )}

                <div className='hidden md:flex items-center gap-5'>
                    <span className='text-xl cursor-pointer hover:bg-cyan-50'>Wishlist<FavoriteBorderIcon className='text-red-600 cursor-pointer' /></span>
                    <button className='bg-red-800 ml-2 hover:bg-red-900 text-white rounded py-2 px-3 cursor-pointer'>Sign up</button>
                    <span className='bg-red-800 hover:bg-red-900 text-white rounded py-2 px-3 gap-2 cursor-pointer'><PersonIcon className='cursor-pointer' /><button className='cursor-pointer'>Login</button></span>
                    <p className='text-black text-2xl font-Oswald cursor-pointer'><ShoppingBagIcon />({cart.length})</p>
                </div>
            </div>

            <img className='h-80 mt-4 w-full' src='https://images.meesho.com/images/marketing/1772432149503.webp' />

            <div className="overflow-hidden w-full m-4">
                <div className="flex gap-5 animate-slide">
                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/3240/1580/image/3adc835e40c12275.png?q=60" />
                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/3240/1580/image/2926790f51fafc9f.jpg?q=60" />
                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/3240/1580/image/86013fd5ae85efdd.jpg?q=60" />
                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/3240/1580/image/8a085229742e7bbb.jpg?q=60" />
                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/3160/1540/image/49b84ff353570294.jpg?q=60" />

                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/3160/1540/image/f9bbd3cec5af6b45.jpg?q=60" />
                    <img className="h-40" src="https://rukminim1.flixcart.com/fk-p-flap/896/438/image/8d6b9d9e85a8b20c.png?q=60" />
                </div>


            </div>

            <div className='flex'>

                <div className='flex flex-wrap w-3/4 gap-6 mt-4 m-4 justify-center  '>
                    {
                        products.map((items, index) => (
                            <div key={items.id}
                                className='flex flex-col w-64 border p-4 rounded bg-gray-50 hover:shadow-xl cursor-pointer'>
                                <img className='h-40 object-contain transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' src={items.image} />
                                <h1 className='mt-2'>{items.title}</h1>
                                <p className='text-sm text-gray-400 mt-2 flex-grow'>{items.description.slice(0, 60)}...</p>
                                <div className='flex justify-between items-center mt-2'>
                                    <span className='text-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>
                                        {items.price}$
                                    </span>
                                    <button className='bg-yellow-300 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 p-2 rounded cursor-pointer' onClick={() => addToCart(items)}>Add to cart</button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {
                    cart.length === 0 ? (
                        <div className="w-full lg:w-1/4 m-4 mt-6 mb-6 p-6 bg-gray-100 rounded-lg min-h-[300px] flex flex-col items-center text-center pt-10">

                            <ShoppingBagIcon className="text-gray-500" style={{ fontSize: 60 }} />

                            <h2 className="text-xl font-semibold mt-3">
                                Your cart is empty
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                Looks like you haven't added anything yet
                            </p>

                            <button
                                onClick={() => window.scrollTo({ top: 5, behavior: "smooth" })}
                                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Continue Shopping
                            </button>

                        </div>
                    ) : (
                        <div className="w-full lg:w-1/4 m-4 mt-6 mb-6 p-4 lg:p-6 bg-gray-100 rounded-lg min-h-[300px]">

                            <div className="flex flex-col gap-4">
                                {cart.map((items, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col lg:flex-row lg:items-center justify-between bg-white p-3 lg:p-4 rounded shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-105"
                                    >
                                        <div className="flex items-center gap-3">

                                            <img
                                                className="h-10 w-10 lg:h-12 lg:w-12 object-contain"
                                                src={items.image}
                                            />

                                            <div className="flex flex-col">
                                                <span className="text-green-700 font-semibold">
                                                    {items.price}$
                                                </span>

                                                <p className="text-xs lg:text-sm">
                                                    {items.title.slice(0, 20)}...
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-3 lg:mt-0">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="bg-gray-300 px-2 rounded cursor-pointer"
                                                    onClick={() => decreaseQty(items.id)}
                                                >
                                                    -
                                                </button>

                                                <span>{items.quantity}</span>

                                                <button
                                                    className="bg-gray-300 px-2 rounded cursor-pointer"
                                                    onClick={() => increaseQty(items.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <DeleteIcon
                                                className="text-red-600 hover:text-red-700 cursor-pointer ml-4"
                                                onClick={() => removeFromCart(index)}
                                            />
                                        </div>

                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t">
                                <h2 className="text-xl lg:text-2xl font-bold">
                                    Total: {totalPrice.toFixed(2)}$
                                </h2>

                                <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded text-white cursor-pointer mt-3 w-full">
                                    Buy Now
                                </button>
                            </div>

                        </div>
                    )
                }

            </div>

            <div className=' bg-gray-100 p-16 text-center shadow-md mt-4'>
                <h1 className='text-black text-2xl'>Style has its own way...</h1>
            </div>

        </div>

    )
}

export default Home