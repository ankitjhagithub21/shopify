import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch(`/api/cart`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setCartItems(data.items);
          setTotalPrice(data.totalPrice);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);

  // Update cart item quantity
  const handleUpdateCartItem = async (productId, quantity) => {
    try {
      const res = await fetch(`/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();

      if (res.ok) {
        setCartItems(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (res.ok) {
        setTotalPrice(data.cart.totalPrice);
        const updatedCartItems = cartItems.filter(item=>item.product._id != productId)
        setCartItems(updatedCartItems);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart/>;
  }

  return (
    <div className="container p-5 mx-auto">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              handleUpdateCartItem={handleUpdateCartItem}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary btn-lg">Total Price: ₹{totalPrice}</button>
    </div>
  );
};

export default Cart;
