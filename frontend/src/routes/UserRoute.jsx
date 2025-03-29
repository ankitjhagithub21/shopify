import { useSelector } from "react-redux"
import {Navigate} from "react-router-dom"
import Loading from "../pages/Loading";


const UserRoute = ({children}) => {
  const {data,isLoading} = useSelector(state=>state.user);
  
  if(isLoading){
    return <Loading/>
  }

  if(!data){
     return <Navigate to={"/"}/>
  }
  return children;
}

export default UserRoute