import React, { useEffect, useState } from "react";
import * as mui from '@mui/material'

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/actions/snackbar.actions"
import { addUrl, getUrlsList } from "../../redux/actions/url.actions";
import { UrlActionTypes } from "../../redux/types/url.types";
import { CustomizedSnackbars, Loader, Message } from "../../containers";

// Formik
import { useFormik } from "formik";
import {
    initialShortyValues,
  shortySchema,
} from "../../model/formValidationSchema";
import { useNavigate } from "react-router-dom";
import { ContentCopy } from "@mui/icons-material";

import {Button} from '../mui'
import {Input} from '../mui'
import { PrimaryButton } from "../mui/Button";

//  ADD URL

const AddUrl = () =>{
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const {loader, error, success, responce} = useSelector((state) => state.urls.add)
    const {  user_login } = useSelector(
      (state) => state.users.login)
    const [data, setData] = useState(null)
    useEffect(()=>{

      if(!user_login){
        navigate("/")
      }

    
      if(success){
          setData(responce ? responce : null )
          const message = "URL Added Successfully!"
          dispatch(setSnackbar(true, "success", message))
          dispatch({type: UrlActionTypes.ADD.RESET})
        }
        return () =>{
            dispatch({type: UrlActionTypes.ADD.RESET})
        }
    },[dispatch, success,  user_login])

    const {values, handleSubmit, handleChange, handleBlur, errors, touched} = useFormik({
        initialValues : {...initialShortyValues, by : user_login? user_login._id : ''},
        validationSchema: shortySchema,
        onSubmit : (values,  { setSubmitting, resetForm }) =>{
          
            dispatch(addUrl(values))
            setSubmitting(false);
            resetForm()
        }
    })
    
let shortUrl = !data ? null : data.shortUrl
    return(
        <div className="add-url">
            <h1>Shrink Your Link</h1>
            {error && <Message type="error" message={error}/>}
            <CustomizedSnackbars />
                <Input
                      name = 'name'
                      id="name"
                      placeholder = "Name"
                      label="Name"
                      value = {values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      margin="normal"
                      className="input"
                      required
                  /><br/>
                  <small style={{color:"red"}} >{errors.name && touched.name && errors.name}</small>
                  <br/>
                <Input
                    name = 'longUrl'
                    id='longUrl'
                    label="Link"
                    placeholder = "Enter your link"
                    value = {values.longUrl}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    margin="normal"
                    className="input"
                    required
                /><br/>

<small style={{color:"red"}} >{errors.longUrl && touched.longUrl && errors.longUrl}</small>
               <br/>
                <PrimaryButton
                    type="submit"
                    onClick={handleSubmit}
                >
                   { loader ? <Loader /> : "Shrink"}
                </PrimaryButton>

                <div>
                  {!data ? '' : 
                <div className="shorturl">
       <Button  onClick={()=>{  
            
            window.open(`/${shortUrl}`, '_blank')
          
            }} className="link">
            {`http://localhost:3000/${shortUrl}`}
        </Button>
        <mui.Tooltip title="Copy Short link" >
            <mui.IconButton
            onClick={
                () => {
                    navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`)
                    dispatch(setSnackbar(true, "success", "Copied"))
                }
            }
            >
                <ContentCopy />
            </mui.IconButton>
        </mui.Tooltip>
                </div>
                }
                </div>
        </div>
    )
}

export default AddUrl