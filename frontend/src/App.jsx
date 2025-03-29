import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchProducts } from "./redux/slices/productSlice";
import { fetchUser } from "./redux/slices/userSlice";
const AdminRoute = lazy(()=>import("./routes/AdminRoute"));
const PublicRoute = lazy(()=>import("./routes/PublicRoute"));
const Login = lazy(()=>import("./pages/Login"));
const Register = lazy(()=>import("./pages/Register"));
const AdminProducts = lazy(()=>import("./admin/AdminProducts"));
const Home = lazy(()=>import("./pages/Home"));
const CreateProduct = lazy(()=>import("./admin/CreateProduct"));
const Dashboard = lazy(()=>import("./admin/Dashboard"));
const Cart = lazy(()=>import("./pages/Cart"));
const UserLayout = lazy(()=>import("./layouts/UserLayout"));
const AdminLayout = lazy(()=>import("./layouts/AdminLayout"));
const ProductDetails = lazy(()=>import("./pages/ProductDetails"));
const UserRoute = lazy(()=>import("./routes/UserRoute"));
const Checkout = lazy(()=>import("./pages/Checkout")); 
const Verify = lazy(()=>import("./pages/Verify")) ;
import "./App.css"
const Orders = lazy(()=>import("./admin/Orders"))
const MyOrders = lazy(()=>import("./pages/MyOrders"));

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={
          
            <UserLayout />
        }>
          <Route index element={<Home />} />
          <Route path="cart" element={<UserRoute>
            <Cart />
          </UserRoute>} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<UserRoute>
            <Checkout />
          </UserRoute>} />
          <Route path="myorders" element={<UserRoute>
            <MyOrders />
          </UserRoute>} />
          <Route path="verify" element={<UserRoute>
            <Verify />
          </UserRoute>} />
          <Route path="login" element={<PublicRoute>
            <Login />
          </PublicRoute>} />
          <Route path="register" element={<PublicRoute>
            <Register />
          </PublicRoute>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute>
          <AdminLayout />
        </AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;