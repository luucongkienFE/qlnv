
import React,{useState,useEffect} from 'react'
import { Container,Box,Button,Grid ,TextField,DialogActions,MenuItem,Tooltip,IconButton,Icon} from '@material-ui/core'
import MaterialTable from '@material-table/core'
import moment from 'moment';
import { Formik,Form,useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { getDataByIdAPI } from 'app/apis';
import { render } from 'react-dom';
import { GET_EMPLOYEE } from 'app/redux/types';
// const validationSchema = Yup.object().shape({
//     relationName: Yup.string()
//     .required("Name is required"),
//   })
export default function FamilyRelationship(props) {
  const {handleClickClose,formikRoot} = props
  const itemRowdata = useSelector(state => state.employee)

  const listGender = useSelector(state => state.dataEmployee.gender)

  const [listRelation,setListRelation] =useState(formikRoot.values.familyRelations)
  const handleChangeEmployee = (rowData) =>{
    
    formikRelation.setValues(rowData)
  }
useEffect(()=>{
  formikRoot.setFieldValue("familyRelations",listRelation.map((relation)=>{
    return {
      ...relation,dateOfBirth:moment(relation.dateOfBirth).format("YYYY-MM-DD")
    }
  }))
  },[listRelation])
  
  
 
  const formikRelation = useFormik({
    initialValues : {
    name: "",
    gender:"",
    phone:"",
    email:"",
    citizenId:"",
    dateOfBirth:"",
    relation:"",
    address:"",
    
  },
 validationSchema:  Yup.object().shape({
        name: Yup.string()
              .matches(/^[\p{L}\s]+$/u, "Không được nhập số và kí tự đặc biệt")
              .min(5, "Hãy nhập đầy đủ họ và tên")
              .max(32, "Nhập tối đa 32 kí tự")
              .required("Họ và tên  không được để trống"),
        gender: Yup.string().required("Vui lòng chọn giới tính"),
        phone: Yup.string()
              .matches(/^\d{10}$/, "Số điện thoại không hợp lệ")
              .max(10, "Nhập tối đa 10 kí tự")
              .required("Số điện thoại không được để trống"),
        email: Yup.string()
              .email("Email không đúng định dạng")
              .max(64, "Nhập tối đa 64 kí tự")
              .required("Email không được để trống"),
        citizenId: Yup.string()
              .matches(/^(\d{9}|\d{12})$/, "Số CCCD/CMT không hợp lệ")
              .max(12, "Nhập tối đa 12 kí tự")
              .required("Số CCCD/CMT không được để trống"),
        dateOfBirth: Yup.date()
              .max(new Date(Date.now() - 0), "Không được nhập ngày lớn hơn hiện tại")
              .required("Vui lòng nhập ngày sinh"),
        relation: Yup.string()
              .max(32, "Nhập tối đa 32 kí tự")
              .required("Quan hệ gia đình không được để trống"),
        address: Yup.string()
              .max(200, "Nhập tối đa 200 kí tự")
              .required("Địa chỉ không được để trống"),
}),
  onSubmit:(values) =>{
    if(formikRelation.values.familyId){
      
      const dataRelation = listRelation.filter(item => item.familyId !== values.familyId)
      
     
      setListRelation([...dataRelation,values])
      formikRelation.resetForm()

    }else{
    values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD")
    setListRelation([...listRelation,values])
    formikRelation.resetForm()
    }
    
  }
})
const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton 
              onClick={() => handleChangeEmployee(rowData, 1)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                // disabled={rowData.status === "Lưu mới" ? false : true}
                onClick={() => {
                 
                  setListRelation(listRelation.filter(item => item.familyId !== rowData.familyId))
                  
                }}
              >
                <Icon color={rowData.status === "Lưu mới" ? "error" : "disabled"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ và tên", field: "name" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      render: (rowdata) => moment(rowdata.dateOfBirth).format("DD/MM/YYYY"),
    },
    { title: "Giới tính", field: "gender",render :gender => listGender.find(i => i.id === itemRowdata.gender)?.name},
    { title: "Số điện thoại", field: "phone" },
    { title: "Email", field: "email" },
    { title: "CCCD", field: "citizenId" },
    { title: "Quan hệ", field: "relation" },
    { title: "Địa chỉ", field: "address" },
  ];
  return (
    <div>
    <div>
      <Grid>
          <form>
            <Grid item sm={12} xs={12} container spacing={2} className="mb-20" >
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type="text"
                fullWidth
                label="Họ và tên"
                variant="outlined"
                name="name"
                value={formikRelation.values.name}
                onChange={formikRelation.handleChange}
                onBlur={formikRelation.handleBlur}
                error={formikRelation.touched.name && Boolean(formikRelation.errors.name)}
                helperText={formikRelation.touched.name && formikRelation.errors.name}
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                select
                fullWidth
                label="Giới tính"
                variant="outlined"
                name="gender"
                value={formikRelation.values.gender}
                onChange={formikRelation.handleChange}
                onBlur={formikRelation.handleBlur}
                error={formikRelation.touched.gender && Boolean(formikRelation.errors.gender)}
                helperText={formikRelation.touched.gender && formikRelation.errors.gender}
                >
                  {listGender.map((item)=>(
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
                </TextField>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type='text'
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                name="phone"
                value={formikRelation.values.phone}
                onChange={formikRelation.handleChange}
                onBlur={formikRelation.handleBlur}
                error={formikRelation.touched.phone && Boolean(formikRelation.errors.phone)}
                helperText={formikRelation.touched.phone && formikRelation.errors.phone}
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type='text'
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formikRelation.values.email}
                onChange={formikRelation.handleChange}
                onBlur={formikRelation.handleBlur}
                error={formikRelation.touched.email && Boolean(formikRelation.errors.email)}
                helperText={formikRelation.touched.email && formikRelation.errors.email}
                />
                </Grid>
                 <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextField
            size="small"
            type='date'
            fullWidth
            InputLabelProps={{
                    shrink: true,
            }}
            label="Ngày sinh"
            variant="outlined"
            name="dateOfBirth"
            value={ moment( formikRelation.values.dateOfBirth ).format('YYYY-MM-DD')}
            onChange={formikRelation.handleChange}
            onBlur={formikRelation.handleBlur}
            error={formikRelation.touched.dateOfBirth && Boolean(formikRelation.errors.dateOfBirth)}
            helperText={formikRelation.touched.dateOfBirth && formikRelation.errors.dateOfBirth}
            /></Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextField
            size="small"
            type='text'
            fullWidth
            label="CCCD"
            variant="outlined"
            name="citizenId"
            value={formikRelation.values.citizenId}
            onChange={formikRelation.handleChange}
            onBlur={formikRelation.handleBlur}
            error={formikRelation.touched.citizenId && Boolean(formikRelation.errors.citizenId)}
            helperText={formikRelation.touched.citizenId && formikRelation.errors.citizenId}
            /></Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextField
            size="small"
            type='text'
            fullWidth
            label="Quan hệ"
            variant="outlined"
            name="relation"
            value={formikRelation.values.relation}
            onChange={formikRelation.handleChange}
            onBlur={formikRelation.handleBlur}
            error={formikRelation.touched.relation && Boolean(formikRelation.errors.relation)}
            helperText={formikRelation.touched.relation && formikRelation.errors.relation}
            /></Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type='text'
                fullWidth
                label="Địa chỉ cụ thể"
                variant="outlined"
                name="address"
                value={formikRelation.values.address}
                onChange={formikRelation.handleChange}
                onBlur={formikRelation.handleBlur}
                error={formikRelation.touched.address && Boolean(formikRelation.errors.address)}
                helperText={formikRelation.touched.address && formikRelation.errors.address}
                />
                </Grid>
                
              </Grid>
          </form>
      </Grid>
    </div>
    <DialogActions className='action-button'>
      <Button className="" type="submit"  variant="contained"
                  color="primary" onClick={formikRelation.handleSubmit}>Thêm</Button>
    </DialogActions>
    <div>
      <Grid container spacing={1}>
            
            <MaterialTable
            title={''}
            style={{width:'100%',marginTop:'20px'}}
            columns={columns}
            data={listRelation}
            options={{
              toolbar:false
            }}
            >

            </MaterialTable>
        
      </Grid>
    </div>
    </div>
  )
}


