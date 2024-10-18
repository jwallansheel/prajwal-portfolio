import React, { useState } from "react";

const productsList = [
  { id: 1, name: "Apple", price: 1.5 },
  { id: 2, name: "Banana", price: 0.75 },
  { id: 3, name: "Orange", price: 1.2 },
  { id: 4, name: "Grapes", price: 2.0 },
  { id: 5, name: "Mango", price: 2.5 },
];

const Shopper = () => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Update product quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Shopper</h1>

      {/* Product List */}
      <h2 className="text-2xl font-semibold mb-3">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsList.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-lg flex justify-between items-center"
          >
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="border rounded-lg p-4 shadow-lg">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >
              <span>
                {item.name} - ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-yellow-400 text-white px-2 rounded hover:bg-yellow-500 transition"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-green-400 text-white px-2 rounded hover:bg-green-500 transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="font-semibold">
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
          <button
            onClick={clearCart}
            className="mt-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Shopper;
