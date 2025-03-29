import { useEffect, useState } from "react";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/userorders`, {
          credentials: "include",
        });
        const resData = await res.json();
        if (resData.success) {
          setOrders(resData.data);
          console.log(resData)
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
                    <span
                      className={`badge ${
                        order.orderStatus === "Delivered"
                          ? "bg-success"
                          : order.orderStatus === "Processing"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
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

export default MyOrders;
