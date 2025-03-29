import { useEffect, useState } from "react";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order`, {
          credentials: "include",
        });
        const data = await res.json();
        if(res.ok){
            setOrders(data)
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
            <thead className="table-primary">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹ {order.totalAmount}</td>
                  <td>
                  
                      {order.orderStatus}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
