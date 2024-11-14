import React, { useState } from 'react';
import CashierItemCard from '../components/cashierpage/CashierItemCard';
import { itemList } from '../utils/dummyData';

export default function CashierPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            // Prevent adding more if quantity exceeds stock
            if (cartItem.quantity >= item.stock) return cartItem;
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return updatedCart;
      }
      // Add item with initial quantity only if it's within stock
      return item.stock > 0
        ? [...prevCart, { ...item, quantity: 1 }]
        : prevCart;
    });
  };


  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === itemId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1 < 0 ? 0 : cartItem.quantity - 1,
          };
        }
        return cartItem;
      });
    });
  };

  const setQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: quantity < 0 ? 0 : quantity };
        }
        return cartItem;
      });
    });
  };

  return (
    <div className="flex flex-row justify-between p-4">
      {/* item list */}
      <div className="flex flex-wrap gap-4">
        {itemList.map((item) => {
          const cartItem = cart.find((cartItem) => cartItem.id === item.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          // Disable button if quantity exceeds stock
          const isDisabled = quantity >= item.stock;

          return (
            <CashierItemCard
              key={item.id}
              item={item}
              quantity={quantity}
              addToCart={() => addToCart(item)}
              removeFromCart={() => removeFromCart(item.id)}
              setQuantity={(value) => setQuantity(item.id, value)}
              isDisabled={isDisabled} // Pass disabled state
            />
          );
        })}
      </div>
      {/* cashier */}
      <div className="w-1/2 h-[60vh] p-4 border rounded-md bg-white shadow-md overflow-hidden flex flex-col justify-between">
        {cart.length === 0 || cart.every((item) => item.quantity === 0) ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="overflow-y-auto">
              {cart
                .filter((item) => item.quantity > 0)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <div>
                      <h4 className="text-md">{item.name}</h4>
                      <p className="text-sm">
                        Rp. {item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <hr className="my-2" />
              <h3 className="text-lg font-bold">
                Total: Rp.{' '}
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
