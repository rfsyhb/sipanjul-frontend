import React, { useState } from 'react';
import { FaRegFrownOpen } from 'react-icons/fa';
import CashierItemCard from '../components/cashierpage/CashierItemCard';
import { itemList } from '../utils/dummyData';

export default function CashierPage() {
  const [cart, setCart] = useState([]);
  const [receivedMoney, setReceivedMoney] = useState('');
  const isEnoughMoney = receivedMoney >= cart.reduce((total, item) => total + item.price * item.quantity, 0);

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

  // Membuat uang kembalian jika minus tampilkan text "Uang tidak cukup"
  const changeMoney = (receivedMoney) => {
    const money =
      receivedMoney -
      cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return money < 0 ? 'Uang tidak cukup!' : `Rp. ${money.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col gap-2 lg:flex-row justify-between p-2 lg:p-4">
      {/* item list */}
      <div className="flex flex-wrap gap-1 lg:gap-4 h-[55vh] lg:h-full overflow-y-auto">
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
      <div
        className={`lg:w-1/2 h-[35vh] lg:h-[60vh] px-2 py-1 lg:p-4 border rounded-md bg-white shadow-md overflow-hidden flex flex-col ${cart.every((item) => item.quantity === 0) ? 'justify-center' : 'justify-between'}`}
      >
        {cart.length === 0 || cart.every((item) => item.quantity === 0) ? (
          <div className="flex flex-col items-center">
            <FaRegFrownOpen className="text-4xl mb-2" />
            <p>No items in the cart!</p>
          </div>
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
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md p-1 border"
                      />
                      <div>
                        <h4 className="text-md font-medium">{item.name}</h4>
                        <p className="text-sm">
                          quantity:{' '}
                          <span className="font-medium ">{item.quantity}</span>{' '}
                        </p>
                        <p className="text-sm">
                          total: Rp.{' '}
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="font-medium text-base lg:text-lg py-1 flex flex-col gap-2">
              <div>
                <div className="flex flex-row justify-between">
                  <h3>Total</h3>
                  <p>
                    Rp.{' '}
                    {cart
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <h3>Uang Pembeli</h3>
                  <input
                    type="number"
                    value={receivedMoney}
                    className=" px-1 border rounded w-1/3"
                    onChange={(e) => setReceivedMoney(Number(e.target.value))}
                    placeholder='uang'
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <h3>Kembalian</h3>
                  <p className={`${!isEnoughMoney && 'text-red-600'}`}>{changeMoney(receivedMoney)}</p>
                </div>
              </div>
              {/* Check out button to alert object of cart */}
              <div>
                <button
                  className="bg-actionBtn text-white text-xs py-1 px-2 rounded w-full hover:bg-activeBtn group"
                  onClick={() => {
                    const selectedCartItemsData = cart.map((item) => ({
                      id: item.id,
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price,
                    }));
                    const filteredCartItemsData = selectedCartItemsData.filter(
                      (item) => item.quantity > 0
                    );
                    alert(JSON.stringify(filteredCartItemsData, null));
                  }}
                >
                  <span className="font-medium text-lg group-hover:text-inactiveBtn">
                    Check Out
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
