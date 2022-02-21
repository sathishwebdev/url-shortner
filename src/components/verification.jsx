import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import { CustomizedSnackbars, Message } from '../containers'
import { setSnackbar } from '../redux/actions/snackbar.actions'
import { verifyUser } from '../redux/actions/users.actions'

import {PrimaryButton} from './mui/Button'

function Verification() {

    const location = useLocation()
    const {id} = useParams()
    const dispatch = useDispatch()
    let key = location.search
    const navigate = useNavigate()
    const {loading, error, success, response} = useSelector(state=>state.users.verify)
    const {user_login} = useSelector(state=> state.users.login)
    useEffect(()=>{
        if(user_login)
        {
            if(response){
                if(!response.result && response.eCode === 'AVA'){

                }
            }
            if(user_login.isVerified){
                dispatch(setSnackbar(true, "success", "Account already Verified"))
            }
            else{ 
                dispatch(verifyUser( id, key))
                if(success){
                    dispatch(setSnackbar(true, "success", response? response.message :"Account Verified"))
                }
            }
    }
    else{
        navigate('/user/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <><div className="App" >

        <div className="header"style={{flexDirection:"column", minHeight:"100vh"}}>
            <div>
                {error && <Message type="error" message={error}/>}
                {success && <Message type="success" message={response? response.message : "Account Verified"} />}
                <h1>Verification</h1>

               {response && !response.result && <>
               <small>Please Login in again</small>
               <br/>
               <PrimaryButton
                onClick={()=>{
                    navigate('/user/login')
                }}
               >
                   Login
               </PrimaryButton>
               </>}
            </div>
            {loading && <div className="loader"></div>}
        </div>
    </div>   <CustomizedSnackbars /> </>
  )
}

export default Verification