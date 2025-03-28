import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setUser } from "../redux/slices/userSlice"
import toast from "react-hot-toast"


const Navbar = () => {
  const user = useSelector(state => state.user.data)
  
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        credentials: 'include'
      })
      dispatch(setUser(null))
      toast.success("Logout successfull.")
    } catch (error) {

      console.log(error)
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary  sticky-top">
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           
            
            {
              user && <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s" alt="" className="rounded-5" width={30} />
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                <li><button className="dropdown-item" to="#" onClick={handleLogout}>Logout</button></li>

              </ul>
            </li>
            }
             <li className="nav-item">
              <Link className="nav-link  text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link  text-white" aria-current="page" to="/">
                About
              </Link>
            </li>
            {
              user?.isAdmin && <li className="nav-item">
                <Link to="/admin" className="nav-link text-white">Dashboard</Link>
              </li>
            }

          </ul>

          <div className="d-flex gap-2">

            {
              !user && <>
                <Link to={"/login"} className="btn btn-warning">
                  Login
                </Link>
                <Link to="/register" className="btn btn-warning">
                  Signup
                </Link>
              </>
            }

            

          </div>

        </div>
      </div>
    </nav>

  )
}

export default Navbar