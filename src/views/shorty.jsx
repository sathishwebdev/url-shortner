import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import AddUrl from "../components/URL/AddUrl"

const Shorty = (props) =>{
    const{ user_login } = useSelector(
        (state) => state.users.login
      );

    const navigate = useNavigate()

      useEffect(()=>{
          if(!user_login){
            navigate('/')
          }else if(!user_login.isVerified){
            navigate('/user/verify')
          }
      },[user_login])
    return(
        <div className="App">
            <div className="header " style={{minHeight:"100vh"}} >
                <div className="col-12" >
                    <AddUrl />
                </div>
                {/* <Link to = "/user/links"> table </Link> */}
            </div>
        </div>
        )
}

export default Shorty