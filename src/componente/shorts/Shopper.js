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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
    <div>
      <h1>Shopper</h1>

      {/* Product List */}
      <h2>Products</h2>
      <div>
        {productsList.map((product) => (
          <div key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <span>
                {item.name} - ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </span>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Shopper;
