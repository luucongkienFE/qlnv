

import  React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Dialog , DialogActions,Button} from '@material-ui/core';
import ProfileEmployee from './ProfileEmployee';
import EmployeeDiploma from '../EmployeeDiploma/EmployeeDiploma';
import FamilyRelationship from '../FamilyRelationship/FamilyRelationship';
import { useFormik,Form } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ADD_EMPLOYEE, GET_DATA_BY_ID, GET_EMPLOYEE, GET_EMPLOYEE_DATA, UPDATE_EMPLOYEE } from 'app/redux/types';
import RegisterDialog from './RegisterDialog/RegisterDialog';
import { getDataByIdAPI } from 'app/apis';
import moment from 'moment';
import { GET_FORM_EMPLOYEE } from 'app/redux/types';

export default function AddNewEmployeeDialog(props) {
  
  const itemRowdata =useSelector(state => state.employee)
  
  const dispatch = useDispatch()
  const [value, setValue] = useState('1');
  const {
    handleClickOpen,
    handleClickClose,
    page,
    pageSize,
    setShouldOpenDialog,
    handleOpenViewEmployeeDialog, 
    isView,
    setIsView
  } =props
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
const [openButtonRegisterDialog,setOpenButtonRegisterDialog] =useState(false)
const handleClickOpenRegister  = () => {
 setOpenRegisterDialog(true)
}
const handleClickCloseRegister  = () => {
 setOpenRegisterDialog(false)
 isView && handleClickClose();
 setIsView(false);  
}

useEffect(()=>{
  
  if(itemRowdata.employeeId){
      getDataByIdAPI(itemRowdata.employeeId).then(res => formik.setFieldValue("certificates",res.data.data.certificates.map((certificates)=>{
      return{
      ...certificates,issuanceDate:moment(certificates.issuanceDate).format("YYYY-MM-DD"),educationStartDate : moment(certificates.educationStartDate).format("YYYY-MM-DD")
      ,educationEndDate : moment(certificates.educationEndDate).format("YYYY-MM-DD")
      }
    })
    ))
  getDataByIdAPI(itemRowdata.employeeId).then(res => formik.setFieldValue("familyRelations",res.data.data.familyRelations.map((relation)=>{
    return {
      ...relation,dateOfBirth:moment(relation.dateOfBirth).format("YYYY-MM-DD")
    }
  })
  ))
  
}
},[])

const setImgSrc = (src) =>{
  formik.setFieldValue("employeeInfo.photoUrl",src)

}
useEffect(()=>{
  if(itemRowdata.employeeId){
    dispatch({type:GET_FORM_EMPLOYEE,id:itemRowdata.employeeId})
  }
  },[])

useEffect(()=>{
  if(itemRowdata.employeeId){
    dispatch({type:GET_DATA_BY_ID,id:itemRowdata.employeeId})
    }
},[])
    

const formik = useFormik({
  initialValues:{
    employeeInfo : {
    fullName:itemRowdata.fullName ||  "",
    gender: itemRowdata.gender || 3 ,
    phone:itemRowdata.phone || "",
    email:itemRowdata.email || "",
    code:itemRowdata.code || "",
    address:itemRowdata.address || "",
    dateOfBirth:itemRowdata.dateOfBirth ||  '',
    citizenId:itemRowdata.citizenId || "",
    photoUrl:"",
    teamId:itemRowdata.teamId || "",
    },
    certificates:itemRowdata.certificates || [],
    familyRelations:itemRowdata.familyRelations || []
  },

  validationSchema:Yup.object().shape({
    employeeInfo:Yup.object().shape({
      fullName:Yup.string()
          .matches(/^[\p{L}\s]+$/u, "Không được nhập số và kí tự đặc biệt")
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Tên nhân viên không được để trống"),
    gender:Yup.number().oneOf([0 , 1, 2],'Chọn giới tính'),
    phone:Yup.string()
        .matches(/^\d{10}$/, "Số điện thoại không hợp lệ")
        .max(10, "Nhập tối đa 10 kí tự")
        .required("Số điện thoại không được để trống"),
    email:Yup.string()
        .email("Email không đúng định dạng")
        .max(64, "Nhập tối đa 64 kí tự")
        .required("Email không được để trống"),
    code:Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Mã nhân viên không được để trống"),
    address:Yup.string()
        .max(200, "Nhập tối đa 200 kí tự")
        .required("Địa chỉ không được để trống"),
    dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), "Yêu cầu trên 18 tuổi")
        .min(new Date(Date.now() - 1892160000000), "Yêu cầu dưới 60 tuổi")
        .required("Vui lòng nhập ngày sinh"),
    citizenId:Yup.string()
        .matches(/^(\d{9}|\d{12})$/, "Số CCCD/CMT không hợp lệ")
        .max(12, "Nhập tối đa 12 kí tự")
        .required("Số CCCD/CMT không được để trống"),
    teamId:Yup.string()
        .required("Vui lòng chọn nhóm").nullable(),
    })
    }),
  onSubmit:(values,touched,errors) =>{
    
    if(itemRowdata.employeeId){
      values.employeeInfo.dateOfBirth = moment(values.employeeInfo.dateOfBirth).format("YYYY-MM-DD"),
        values.employeeId = itemRowdata.employeeId
        dispatch({type:UPDATE_EMPLOYEE,values,page,pageSize})
        
        
        
      }else{
        
        values.employeeInfo.dateOfBirth = moment(values.employeeInfo.dateOfBirth).format("YYYY-MM-DD")
        dispatch({type:ADD_EMPLOYEE,values,page,pageSize})
        
      }
      setOpenButtonRegisterDialog(true)
      
  }
  
})



  return (
    
    <Dialog open={handleClickOpen} onClose={handleClickClose} fullWidth maxWidth="lg" >
                  
      <form onSubmit={formik.handleSubmit}>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" fullWidth>
            <Tab style={{ margin: "0 20px" }} label="Thông tin nhân viên" value="1" />
            <Tab style={{ margin: "0 20px" }} label="Thông tin văn bằng" value="2" />
            <Tab style={{ margin: "0 20px" }} label="Quan hệ gia đình" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><ProfileEmployee handleClickClose={handleClickClose} 
        formik={formik} setImgSrc={setImgSrc} setShouldOpenDialog={setShouldOpenDialog}
        /></TabPanel>
        <TabPanel value="2"><EmployeeDiploma handleClickClose={handleClickClose} 
        formikRoot={formik} 
        /></TabPanel>
        <TabPanel value="3"><FamilyRelationship handleClickClose={handleClickClose} 
        formikRoot={formik}
        /></TabPanel>
      </TabContext>
      
    </Box>
    <DialogActions className='action-button'>
    <Button type="submit"  variant="contained" color="primary">Lưu</Button>
      
     {(openButtonRegisterDialog || isView) && <Button  onClick={handleClickOpenRegister} variant="contained" color="secondary">Đăng ký</Button>}
    <Button variant="contained" onClick={handleClickClose} >Hủy</Button>

    </DialogActions>
    {
          (openRegisterDialog || isView) && (
            <RegisterDialog
              setShouldOpenDialog={setShouldOpenDialog}
              setOpenRegisterDialog={setOpenRegisterDialog}
              setImgSrc={setImgSrc}
              handleClickOpenRegister={handleClickOpenRegister}
              handleClickCloseRegister={handleClickCloseRegister}
            >
            </RegisterDialog>
          )
        }
           </form>
    </Dialog>
  );
  

}