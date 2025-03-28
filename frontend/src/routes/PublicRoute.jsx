import { useSelector } from "react-redux"
import {Navigate} from "react-router-dom"

const PublicRoute = ({children}) => {
  const user = useSelector(state=>state.user.data);

  if(user){
    return <Navigate to={"/"}/>
  }
  return children;
}

export default PublicRoute