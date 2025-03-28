import { useSelector } from "react-redux"
import {Navigate} from "react-router-dom"
import Loading from "../pages/Loading";


const AdminRoute = ({children}) => {
  const {data,isLoading} = useSelector(state=>state.user);
  
  if(isLoading){
    return <Loading/>
  }

  if(!data || !data.isAdmin){
     return <Navigate to={"/"}/>
  }
  return children;
}

export default AdminRoute