import React, { useEffect, useState } from "react";
import { shortyColumns, shortylistOptions } from "../../model/mui-datatable";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import { deleteUrl, getUrlsList } from "../../redux/actions/url.actions";
import { setSnackbar } from "../../redux/actions/snackbar.actions";
import { UrlActionTypes } from "../../redux/types/url.types";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Refresh } from "@mui/icons-material";
import { ConfirmationDialog, Loader, Message, CustomizedSnackbars } from "../../containers";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const getMuiTheme = () =>
createTheme({
  overrides: {
    MUIDataTableHeadCell:{
        root:{
            zIndex: "0.5"
        }
    }
  },
});



const UrlList = (props) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [rowsToDelete, setRowsToDelete] = useState([])
    const navigate  = useNavigate()
    const { user_login } = useSelector((state) => state.users.login);

    console.log(user_login)

//  DELETE SELECTOR
    const {
        loading: loadingDelete,
        error : errorDelete,
        success: successDelete
    } = useSelector((state)=> state.urls.delete)

// LIST SELECTOR

    const {
        loading: loadingList,
        error : errorList,
        urls
    } = useSelector(state=> state.urls.list)


    useEffect(()=>{

        if(!user_login){
            navigate('/')
        }else{
            dispatch(getUrlsList(user_login._id))
        }

        if(successDelete){
            const message = "URLs Deleted Successfully!"
            dispatch(setSnackbar(true, "success", message))
            dispatch({type: UrlActionTypes.DELETE.RESET})
        }

        return ()=>{
            dispatch({type: UrlActionTypes.DELETE.RESET})
            dispatch({type: UrlActionTypes.URL_LIST.RESET})
        }
    },[dispatch, navigate, successDelete, user_login])

    shortylistOptions.customToolbarSelect = ({data}) =>{
        return (
            <>
            <Tooltip title="Delete Selected URLs" >
                <IconButton
                    onClick={()=>{
                        let items = []
                        data.forEach(element =>{
                            items.push(urls.data[element.dataIndex])
                        })
                        setRowsToDelete(items)
                        setShowModal(true)
                    }}
                >
                    <Delete />
                </IconButton>
            </Tooltip>
            </>
        )
    }

    shortylistOptions.customToolbar=({data}) =>{
        return (
            <>
            <Tooltip title="Refresh to Update" >
                <IconButton
                    onClick={()=>{
                        dispatch(getUrlsList(user_login._id))
                    }}
                >
                    <Refresh />
                </IconButton>
            </Tooltip>
            </>
        )
    }

    const closeDialog = () => {
        setShowModal(false)
    }

    const confirmDelete = () =>{
        dispatch(deleteUrl({urls : rowsToDelete, user: user_login._id}))
        setShowModal(false)
    }


    return (
        <div className="App" style={{marginTop:"100px"}} >

            {
                loadingList?( <Loader />) : (errorList ? (<Message message={errorList} type="error" />) :(
                    urls.data && (
                        <>
                        <div>
                            {loadingDelete && <Loader />}
                            {errorDelete && <Message type={"error"} message = {errorDelete} /> }
                            <CustomizedSnackbars />
                            <MuiThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable 
                                title={`URL List (${urls.data.length})`}
                                data={urls.data.reverse()}
                                columns={shortyColumns}
                                options={shortylistOptions}
                            /></MuiThemeProvider> 
                        </div>
                        <ConfirmationDialog
                            open={showModal}
                            closeDialog = {closeDialog}
                            agreeConfirm={confirmDelete}
                            type="urls"
                        />
                        </>
                    )
                ) )
            }
        </div>
    )

}


export default UrlList