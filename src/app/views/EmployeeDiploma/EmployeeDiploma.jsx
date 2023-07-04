import React, { useEffect, useState } from 'react'
import { Container,Box,Button,Grid ,TextField,DialogActions,Tooltip,IconButton,Icon} from '@material-ui/core'
import MaterialTable from '@material-table/core'
import { useFormik,Form } from 'formik';
import * as Yup from "yup";
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getDataByIdAPI } from 'app/apis';
import { useDispatch } from 'react-redux';
import { setDiplomaSlice } from 'app/redux/slice/employee';
import { v4 as uuidv4 } from "uuid";
export default function EmployeeDiploma(props) {

  
  const dispatch = useDispatch()
  const {formikRoot}= props
    const itemRowdata = useSelector(state => state.employee)
   
  const [listDiploma,setListDiploma] = useState(formikRoot.values.certificates)
  
  useEffect(()=>{
    
    formikRoot.setFieldValue("certificates",listDiploma.map((diploma)=>{
      return {
        ...diploma,issuanceDate:moment(diploma.issuanceDate).format("YYYY-MM-DD"),educationStartDate : moment(diploma.educationStartDate).format("YYYY-MM-DD")
      ,educationEndDate : moment(diploma.educationEndDate).format("YYYY-MM-DD")}
    
    }))
  },[listDiploma])
  useEffect(()=>{
    if(itemRowdata.employeeId){
      getDataByIdAPI(itemRowdata.employeeId).then(res =>setListDiploma(res.data.data.certificates))
    }
  },[])
  const dataEmployee = useSelector(state => state.employees)
  const handleChangeEmployee = (rowData) =>{
      formikDiploma.setValues(rowData)}
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton 
                onClick={() =>handleChangeEmployee(rowData, 1)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
              
                onClick={() => {
              
                  setListDiploma(listDiploma.filter(item => item.certificateId !== rowData.certificateId))
                  
                  
                }}
              >
                <Icon color={rowData.status === "Lưu mới" ? "error" : "disabled"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Tên văn bằng", field: "name" },
    { title: "Lĩnh vực ", field: "field" },
    { title: "Nội dung", field: "content" },
    { title: "Nơi cấp", field: "educationalOrg" },
    {
      title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowdata) => moment(rowdata.issuanceDate).format("DD/MM/YYYY"),
    },
    { title: "Ngày bắt đầu", field: "educationStartDate",render: (rowdata) => moment(rowdata.educationStartDate).format("DD/MM/YYYY")},
    { title: "Ngày kết thúc", field: "educationEndDate" ,render: (rowdata) => moment(rowdata.educationEndDate).format("DD/MM/YYYY")},
  ];

  
  const formikDiploma = useFormik({
    initialValues : {
    name: "",
    content:"",
    field:"",
    educationalOrg:"",
    educationalOrg:"",
    issuanceDate:"",
    educationStartDate:"",
    educationEndDate:"",
  },
  validationSchema:Yup.object().shape({
        name: Yup.string()
              .matches(/^[\p{L}\s]+$/u, "Không được nhập số và kí tự đặc biệt")
              .max(32, "Nhập tối đa 32 kí tự")
              .required("Tên văn bằng không được để trống"),
        content: Yup.string().required("Nội dung không được để trống"),
        field: Yup.string()
              .max(64, "Nhập tối đa 64 kí tự")
              .required("Lĩnh vực không được để trống"),
        educationalOrg: Yup.string()
              .max(100, "Nhập tối đa 100 kí tự")
              .required("Nơi cấp không được để trống"),
        issuanceDate: Yup.date()
              .max(new Date(Date.now() - 0), "Không được nhập ngày lớn hơn hiện tại")
              .required("Vui lòng nhập ngày cấp"),
        educationStartDate: Yup.date().required("Vui lòng nhập ngày bắt đầu"),
        educationEndDate: Yup.date().required("Vui lòng nhập ngày kết thúc"),
}),
  
  onSubmit:(values) =>{
    if(formikDiploma.values.certificateId){
     
      const dataDip = listDiploma.filter(item => item.certificateId !== values.certificateId)
      
     
      setListDiploma([...dataDip,values])

    }
    else{
     values.issuanceDate = moment(values.issuanceDate).format("YYYY-MM-DD")
    values.educationStartDate = moment(values.educationStartDate).format("YYYY-MM-DD")
    values.educationEndDate = moment(values.educationEndDate).format("YYYY-MM-DD")
    setListDiploma([...listDiploma,values])
    formikDiploma.resetForm()
      }
    
  }
})
  
  return (
    <div>
    <div>
      <Grid>
          <div >
            <Grid item sm={12} xs={12} container spacing={2} className="mb-20" >
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type="text"
                fullWidth
                label="Tên văn bằng"
                variant="outlined"
                name="name"
                value={formikDiploma.values.name}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.name && formikDiploma.errors.name}
                helperText={formikDiploma.touched.name && formikDiploma.errors.name}
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type="text"
                fullWidth
                label="Nội dung văn bằng"
                variant="outlined"
                name="content"
                value={formikDiploma.values.content}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.content && formikDiploma.errors.content}
                helperText={formikDiploma.touched.content && formikDiploma.errors.content}
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type="text"
                fullWidth
                label="Lĩnh cực"
                variant="outlined"
                name="field"
                value={formikDiploma.values.field}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.field && formikDiploma.errors.field}
                helperText={formikDiploma.touched.field && formikDiploma.errors.field}
                /></Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                size="small"
                type="text"
                fullWidth
                label="Nơi cấp"
                variant="outlined"
                name="educationalOrg"
                value={formikDiploma.values.educationalOrg}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.educationalOrg && formikDiploma.errors.educationalOrg}
                helperText={formikDiploma.touched.educationalOrg && formikDiploma.errors.educationalOrg}
                />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                size="small"
                type="date"
                fullWidth
                InputLabelProps={{
                    shrink: true,
            }}
                label="Ngày cấp"
                variant="outlined"
                name="issuanceDate"
                value={moment( formikDiploma.values.issuanceDate ).format('YYYY-MM-DD')}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.issuanceDate && formikDiploma.errors.issuanceDate}
                helperText={formikDiploma.touched.issuanceDate && formikDiploma.errors.issuanceDate}
                />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                size="small"
                type='date'
                fullWidth
                InputLabelProps={{
                    shrink: true,
            }}
                label="Ngày bắt đầu"
                variant="outlined"
                name="educationStartDate"
                value={moment( formikDiploma.values.educationStartDate ).format('YYYY-MM-DD')}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.educationStartDate && formikDiploma.errors.educationStartDate}
                helperText={formikDiploma.touched.educationStartDate && formikDiploma.errors.educationStartDate}
                />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                size="small"
                type='date'
                fullWidth
                InputLabelProps={{
                    shrink: true,
            }}
                label="Ngày kết thúc"
                variant="outlined"
                name="educationEndDate"
                value={moment( formikDiploma.values.educationEndDate ).format('YYYY-MM-DD')}
                onChange={formikDiploma.handleChange}
                onBlur={formikDiploma.handleBlur}
                error={formikDiploma.touched.educationEndDate && formikDiploma.errors.educationEndDate}
                helperText={formikDiploma.touched.educationEndDate && formikDiploma.errors.educationEndDate}
                />
                </Grid>
                </Grid>
                
     <DialogActions className='action-button'>
                  <Button  type='submit'  variant="contained" onClick={formikDiploma.handleSubmit}
                  color="primary">Thêm</Button>

     </DialogActions>
  
          </div>
   
      </Grid>
    </div>
    <div style={{marginTop:'20px',display:"flex",justifyContent:"flex-end"}}>
    {/* <Button variant="contained" type='submit'
                  color="primary" >Thêm</Button> */}
                  </div>
    <div>
      <Grid container spacing={1}>
            
            <MaterialTable
            title={''}
            style={{width:'100%',marginTop:'20px'}}
            columns={columns}
            data={listDiploma}
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
