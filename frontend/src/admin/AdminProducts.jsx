
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../redux/slices/productSlice";


const AdminProducts = () => {
  const {data} = useSelector((state)=>state.product)
   const dispatch = useDispatch();

  const handleDelete = async (productId) => {
    if (confirm("Are you sure ?")) {
      try {      
        dispatch(deleteProduct(productId))
        toast.success("Product deleted.")
      } catch (error) {
        console.log(error)
        toast.error("Error deleting product.")
      }
    }
  }

  return (
    <div className="container p-5 mx-auto">
      <table className="table">
        <thead>
          <tr>

            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((product) => {
              return <tr key={product._id} >

                <td>
                  <img src={product.image} width={100} height={50} className="object-fit-cover border rounded" alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>₹ {product.price}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}

export default AdminProducts