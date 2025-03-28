import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const ProductDetails = () => {
    const {id} = useParams();
    const [product,setProduct] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(()=>{

        const fetchProduct = async() => {
            setLoading(true)
            try{
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if(res.ok){
                    setProduct(data)
                }
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchProduct()
    },[id])

    const handleAddToCart = async(productId) => {
        try{
            const res = await fetch(`/api/cart/add`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({productId,quantity:1})
            })
            const data = await res.json();
            if(data.success){
                toast.success(data.message)
                navigate("/cart")
            }else{
                toast.error(data.message)
            }
        }catch(error){  
            toast.error(error.message)
            console.log(error)
        }
    }

    if(loading){
        return <p>Loading..</p>
    }
    if(!product){
        return <p>Product not found.</p>
    }

  return (
    <div className="container mx-auto p-5">
        <div className="row">
            <div className="col-md-6">
                <img src={product.image} alt="product" className="img-fluid rounded-lg" />
            </div>
            <div className="col-md-6 p-5 d-flex flex-column gap-3 align-items-start">
                <h2>{product.name}</h2>
                <b>{product.price}</b>
             
                <button className="btn btn-primary" onClick={()=>handleAddToCart(product._id)}>ADD TO CART</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails