import React, { useEffect, useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const getCountry = async () => {
        var fetchData = await fetch("https://fakestoreapi.com/products");
        var result = await fetchData.json();
        setProducts(result);
        console.log(result);
    }

    useEffect(() => {
        getCountry();
    }, []);

    const addToCart = (items) => {
        setCart([...cart, items])
    };

    const removeFromCart = (id) => {
        const deleteConfirm = window.confirm("Are you sure want to delete the item from cart?!!!");
        if (deleteConfirm) {
            const updatedCart = cart.filter((items, index) => index !== id)
            setCart(updatedCart)
        }
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price
    }, 0)



    return (
        <div className=''>
            <div className='flex bg-black p-8 justify-between items-center '>
                <img className='h-30' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyF5hXBqwGEg0qUrsXboYN_dNLqGiSDSVy0Q&s' />
                <h1 className='text-white text-bold text-4xl mr-22 font-Oswald'>Flipkart</h1>
                <p className='text-white text-2xl font-Oswald'><ShoppingBagIcon/>({cart.length})</p>
            </div>

            <div className='flex'>

                <div className='flex flex-wrap w-3/4 gap-6 mt-6 justify-center mb-14 '>
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
                        <p className='text-xl mt-6'>No items in cart<ShoppingBagIcon/></p>
                    ) : (
                        <div className='w-1/4 mt-6 mb-6 p-6 bg-gray-200 min-h-screen cursor-pointer'>
                    {
                        cart.map((items, index) => (
                            <div key={index}
                                className='flex items-center justify-between bg-white p-4 mb-3 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
                            >
                                <div className='flex items-center gap-3'>
                                    <img className='h-12 w-12 object-contain' src={items.image} />
                                    <span className='text-green-700'>{items.price}$</span>
                                    <p className='text-sm'>{items.title.slice(0, 20)}...</p>
                                </div>
                                <button className='bg-red-500 hover:bg-red-600 text-white p-2 rounded' onClick={() => removeFromCart(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                   {
                    cart.length > 0 &&(
                         <div className='mt-6 pt-4'>
                        <h2 className='text-2xl text-bold'>Total: {totalPrice.toFixed(2)}$</h2>
                        <button className='bg-yellow-400 hover:bg-yellow-500 p-2 rounded text-white cursor-pointer mt-2'>Buy now</button>
                    </div>
                    )
                   }
                </div>
                    )
                }

            </div>

            <div className=' bg-black p-16 text-center '>
                <h1 className='text-white text-2xl'>Style has its own way...</h1>
            </div>

        </div>

    )
}

export default Home