import React, { useState } from 'react';
import ItemCard from '../components/cashierpage/ItemCard';
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
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return updatedCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
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
          return (
            <ItemCard
              key={item.id}
              imageUrl={item.imageUrl}
              stock={item.stock}
              price={item.price}
              packageSize={item.packageSize}
              name={item.name}
              quantity={quantity}
              addToCart={() => addToCart(item)}
              removeFromCart={() => removeFromCart(item.id)}
              setQuantity={(value) => setQuantity(item.id, value)}
            />
          );
        })}
      </div>
      {/* cashier */}
      <div className="w-1/3 p-4 border rounded-md bg-white shadow-md overflow-hidden flex flex-col justify-between">
        
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
                      <h4 className="text-lg">{item.name}</h4>
                      <p>
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
