import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../redux/slices/userSlice"

const Navbar = () => {
  const user = useSelector(state => state.user.data)
  const dispatch = useDispatch()
  const handleLogout = async() => {
     try{
        dispatch(logoutUser())
     }catch(error){ 
      console.log(error)
     }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark  sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Shopify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link  text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">
                Cart
              </Link>
            </li>

          </ul>

          <div className="d-flex gap-2">

            {
              user ? <button className="btn btn-danger" onClick={handleLogout}>Logout</button> : <>
              <Link to={"/login"} className="btn btn-success">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-success">
                Signup
              </Link>
            </>
       }

       {
        user && user.isAdmin && <Link to="/admin" className="btn btn-primary">Dashboard</Link>
       }

          </div>

        </div>
      </div>
    </nav>

  )
}

export default Navbar