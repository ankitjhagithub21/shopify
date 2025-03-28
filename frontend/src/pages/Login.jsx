import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/slices/userSlice'
import { useState } from 'react'


const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const formValues = Object.fromEntries(formData.entries());
    setLoading(true)
    dispatch(loginUser(formValues))
    setLoading(false)


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

        <button disabled={loading} type="submit" className="btn btn-primary">
          {
            loading ? <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div> : 'Submit'
          }
        </button>
      </form>

    </div>
  )
}

export default Login