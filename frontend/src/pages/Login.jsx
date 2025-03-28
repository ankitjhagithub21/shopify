import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'
import { useState } from 'react'
import toast from 'react-hot-toast'


const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries());
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formValues),
      });
      const resData = await res.json();
      if (resData.success) {
        dispatch(setUser(resData.data))
        toast.success(resData.message);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='container p-5 mx-auto'>
      <h2 className='mb-3'>Log In</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
          />

        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
          />

        </div>

        <button disabled={loading} type="submit" className="btn btn-lg btn-primary">
          {
            loading ? <div className='d-flex align-items-center gap-2'>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Please wait
            </div> : 'Submit'
          }
        </button>
      </form>

    </div>
  )
}

export default Login