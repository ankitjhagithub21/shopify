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
import "./App.css"

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
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetails />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;