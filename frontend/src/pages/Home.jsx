import { useSelector } from "react-redux";
import Product from "../components/Product";

const Home = () => {
   const { data, isLoading, isError } = useSelector((state) => state.product);

 
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }

  return (
    <div className="container mx-auto my-5">
      <div className="row">
        {
          data.map((product)=>{
            return <Product key={product._id} product={product}/>
          })
        }
      </div>
    </div>  
  );
};

export default Home;
