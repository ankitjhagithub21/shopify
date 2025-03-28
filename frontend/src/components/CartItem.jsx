import { useState } from "react";

const CartItem = ({ item, handleUpdateCartItem, handleRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleUpdateCartItem(item.product._id, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    handleUpdateCartItem(item.product._id, newQuantity);
  };

  return (
    <tr>
      <td className="d-flex flex-column">
        <img
          src={item.product.image}
          width={100}
          height={50}
          className="object-fit-cover border rounded"
          alt={item.product.name}
        />
        {item.product.name}
      </td>
      <td>
        <button className="btn btn-sm btn-warning" onClick={handleDecrement}>
          -
        </button>
        <button className="btn btn-sm">{quantity}</button>
        <button className="btn btn-sm btn-success" onClick={handleIncrement}>
          +
        </button>
      </td>
      <td>₹ {item.price * quantity}</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleRemoveItem(item.product._id)}
        >
          Remove From Cart
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
