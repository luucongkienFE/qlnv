import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  Button,
  DialogActions,
  Grid,
  MenuItem
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { SEND_TO_BOSS } from "app/redux/types";
export default function SendToBoss(props){
  const {handleOpenSendToBoss, handleCloseSendToBoss,handleClickCloseInfo,handleClickCloseRegister,setOpenRegisterDialog,setShouldOpenDialog} = props
  const position = useSelector((state) => state.dataEmployee.position);
  const itemRowdata =useSelector(state => state.employee)
  const dispatch = useDispatch()
 
  const formik = useFormik({
    initialValues: {
        employeeId:itemRowdata.employeeId,
        status: "",
        registerDate: "",
        registerName: "",
        registerPosition:"" ,
        registerContent: ""
      },
    
    onSubmit: (values) => {
      values.status = 3
     
      dispatch({type:SEND_TO_BOSS,values})
      handleCloseSendToBoss()
      setOpenRegisterDialog(false)
      setShouldOpenDialog(false)
    },
  })
  return (
    <div>

      <Dialog open={handleOpenSendToBoss} onClose={handleCloseSendToBoss}>
        <form onSubmit={formik.handleSubmit}>
        <DialogContent>
    <Grid container spacing={2}>
        <Grid item xs={4}> 
            <TextField
                size="small"
                name="registerDate"
                label="Ngày gửi"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={formik.handleChange}
              /></Grid>
        <Grid item xs={4}>   
           <TextField
                size="small"
                name="registerName"
                label="Tên lãnh đạo"
                select
                fullWidth
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => {

                  formik.handleChange(e);
                  formik.setFieldValue("registerPosition",e.target.value);
                }
              }
              >
                {position.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
              </TextField>
              
              
              </Grid>
              <Grid item xs={4}>   
           <TextField
                size="small"
                name="registerPosition"
                label="Chức vụ"
                type="text"
                fullWidth
                variant="outlined"
                value={position.find(item => item.id == formik.values.registerPosition)?.position}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={formik.handleChange}
              /></Grid>
              <Grid item xs={12}>   
           <TextField
                size="small"
                name="registerContent"
                label="Nội dung"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={formik.handleChange}
              /></Grid>
      {/* </Grid> */}
    </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="info" color="primary" onClick={handleCloseSendToBoss}>Hủy</Button>
          <Button variant="contained" color="primary" type="submit">Lưu</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
