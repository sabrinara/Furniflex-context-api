// src/components/Cart.js
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              min="1"
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
