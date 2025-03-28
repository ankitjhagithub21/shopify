import { useNavigate } from "react-router-dom"


const Product = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div className="col-md-4 my-3 product" onClick={()=>navigate(`/product/${product._id}`)}>
            <div className="card border-0 shadow rounded-5 overflow-hidden">
                <img src={product.image} className="card-img-top object-fit-cover" style={{ height: "200px" }} alt={product.name} />
                <div className="card-body">
                    <h2 className="fs-4">{product.name}</h2>
                    <p className="card-text text-success fs-5">
                        ₹ {product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Product