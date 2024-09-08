import { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []);

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease the quantity of a cart item
  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove the item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Cart</h1> */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-4/5">
            <h1 className="text-2xl font-bold mb-4 text-black ml-5">An overview of your order</h1>
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-200 flex justify-between items-centers gap-6 m-4 rounded ">
                  <div className="hidden md:flex items-center justify-between  ml-8">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 py-1 px-3 rounded">
                      -
                    </button>
                    <span className="text-lg mx-2 text-black">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 py-1 px-3 rounded">
                      +
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <div>
                      <img src={item.image} alt={item.name} className="w-full h-[110px]" />
                    </div>
                    <div >
                      <h3 className="text-xl text-black font-bold">{item.name}</h3>
                    </div>
                  </div>
                  <div className="hidden md:flex">

                  </div>
                  <div className="px-4 pb-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className=" text-gray-900 py-3 ml-10 md:mb-6 rounded">
                      X
                    </button>
                    <div className="flex md:hidden items-center justify-between">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 py-1 px-3 rounded">
                      -
                    </button>
                    <span className="text-lg mx-2 text-black">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 py-1 px-3 rounded">
                      +
                    </button>
                  </div>
                    <p className="text-lg text-black font-bold ">{item.price}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/5">
            <h1 className="text-2xl font-bold mb-4 text-black">Oder details</h1>
            <div className="bg-slate-100 p-4 rounded text-lg">
              <div className="flex justify-between ">
                <h1>Subtotal</h1>
                <h1>€ 251</h1>
              </div>
              <div className="flex justify-between ">
                <h1>Subtotal</h1>
                <h1>251</h1>
              </div>
              <div className="flex justify-between ">
                <h1>Estimated Tax <span className="text-sm rounded-full border border-gray-400 px-2">i</span>
                </h1>
                <h1>€ -</h1>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between ">
                <h1>Subtotal</h1>
                <h1>€ 251</h1>
              </div>
            </div>
            <div className="bg-black px-2 text-center rounded text-base mt-4">
              <button
                className="bg-black text-white py-3 rounded">
                GO TO CHECKOUT
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default Cart;
