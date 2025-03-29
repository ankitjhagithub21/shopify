import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const apiUrl = `${import.meta.env.VITE_SERVER_URL}`
  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/cart`, {
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
      const res = await fetch(`${apiUrl}/api/cart/update`, {
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
      const res = await fetch(`${apiUrl}/api/cart/remove`, {
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
     <div>
     <button className="btn btn-primary mx-2">Total Price: ₹{totalPrice}</button>
     <Link to={"/checkout"} className="btn btn-success">Checkout</Link>
     </div>
    </div>
  );
};

export default Cart;
