import { useEffect, useState } from "react";


const Checkout = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setCart(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const shippingAddress = Object.fromEntries(formData.entries());

    if (!cart || cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ shippingAddress, items: cart.items }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.replace(data.session_url);
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        
        {/* Left Section - Shipping Form */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Delivery Address</h4>
              <form className="row g-3" onSubmit={handleCreateOrder}>
                <div className="col-12">
                  <input type="text" className="form-control" placeholder="Full Name" name="fullName" required />
                </div>
                <div className="col-12">
                  <input type="text" className="form-control" placeholder="Phone Number" name="phone" required />
                </div>
                <div className="col-12">
                  <input type="text" className="form-control" placeholder="Address" name="address" required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="City" name="city" required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Postal Code" name="postalCode" required />
                </div>
                <div className="col-12">
                  <input type="text" className="form-control" placeholder="Country" name="country" required />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit">
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Order Summary</h4>
              <ul className="list-group mb-3">
                {cart?.items?.map((item) => (
                  <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={item.product.image} alt={item.product.name} className="img-fluid me-3" width="50" />
                      <span>{item.product.name} (x{item.quantity})</span>
                    </div>
                    <strong>₹ {item.price * item.quantity}</strong>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">Total Price: ₹ {cart?.totalPrice || 0}</h5>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
