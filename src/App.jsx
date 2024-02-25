import React, { useState } from 'react';
import { PRODUCTS } from './products.js';

function App() {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [id]: (prevCartItems[id] || 0) + 1
    }));
  };

  const calculateTotalPrice = () => {
    return Object.keys(cartItems).reduce((total, id) => {
      const product = PRODUCTS.find((p) => p.id === parseInt(id));
      return total + product.price * cartItems[id];
    }, 0);
  };

  const renderCartItems = () => {
    return Object.keys(cartItems).map((id) => {
      const product = PRODUCTS.find((p) => p.id === parseInt(id));
      return (
        <div key={id} className="flex items-center  mb-4">
          <img className='w-20 h-20 mr-2 object-contain bg-black' src={product.pimage} alt="" />
          <div>
            <p>{product.productName} x {cartItems[id]}</p>
            <p>${product.price * cartItems[id]}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className='flex flex-wrap justify-center items-center gap-20 p-10 pr-96 '>
      {PRODUCTS.map((product) => (
        <div key={product.id} className="text-center">
          <img className='w-40 h-40 object-contain bg-black' src={product.pimage} alt="" />
          <p>{product.productName}</p>
          <p>${product.price}</p>
          <button className='border-2 drop-shadow-2xl p-2 rounded hover:bg-green-300' onClick={() => addToCart(product.id)}>add to cart</button>
        </div>
      ))}
      {Object.keys(cartItems).length > 0 && (
        <div className="fixed justify-center items-center pl-20 text-center right-0 top-0 bg-blue-400 h-screen w-1/4">
          <h1 className='pr-20 text-white font-bold text-2xl'>Your Cart</h1>
          {renderCartItems()}
          <p className='pr-10 font-mono text-white text-2xl text-bold'>Total: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
