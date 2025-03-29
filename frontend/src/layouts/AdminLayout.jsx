import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <nav className="bg-dark p-3 d-flex align-items-center gap-5">
        <Link to={"/admin"}>Dashboard</Link>
        <Link to={"/admin/create-product"}>Create Product</Link>
        <Link to={"/admin/products"}>All Products</Link>
        <Link to={"/admin/orders"}>All Orders</Link>
        </nav>
      <Outlet /> 
    </div>
  );
};

export default AdminLayout;
