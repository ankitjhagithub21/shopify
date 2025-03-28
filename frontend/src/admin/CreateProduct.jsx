import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/slices/productSlice'
const CreateProduct = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const formValues = Object.fromEntries(formData.entries());

    setLoading(true)
    try {
     
      dispatch(addProduct(formValues))
      toast.success("Product created successfully.")
      e.target.reset();
    } catch (error) {
      toast.error("Error creating product.")
      console.log(error)
    }finally{
      setLoading(false)
    }


  }

  return (
    <div className='container p-5 mx-auto'>
      <h2 className='mb-3'>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
          />

        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            required
          />

        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image Url
          </label>
          <input
            type="url"
            className="form-control"
            id="image"
            name="image"
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

export default CreateProduct