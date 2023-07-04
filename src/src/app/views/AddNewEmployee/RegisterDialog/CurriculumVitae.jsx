import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import CustomAvatarEditor from "../Avatar";
import '../../../styles/CurriculumVitae.scss'
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { GET_FORM_EMPLOYEE } from "app/redux/types";
import { useSelector } from "react-redux";
import TableRelation from "./TableRelation";
import { formatData,formatDataDate } from "app/components/moment";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CurriculumVitae (props){
    const {setImgSrc,formik}=props

    const dataFormEmployee = useSelector(state => state.formEmployee.data)
    const itemRowdata =useSelector(state => state.employee?.employeeInfo )
    const listGender = useSelector(state => state.dataEmployee.gender)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `Hà Nội, ngày ${day} tháng ${month} năm ${year}`;
    const dispatch = useDispatch()

    useEffect(()=>{
        if(itemRowdata?.employeeId){
            
            formik.setFieldValue("resume",itemRowdata?.employeeInfo||itemRowdata)
        }
    },[])
    
    return(
        <>
        <form onSubmit={formik.handleSubmit}></form>
        <Grid container className="curriculum">
            <Grid item xs={12} >
                <div className="sec1 sec1-text" style={{}}>
                    Cộng hòa xã hội chủ nghĩa Việt Nam
                </div>
                <div className="sec1" style={{}}>
                    Độc lập - Tự Do - Hạnh Phúc
                </div>
                <div className="sec1" style={{}}>
                    ============================
                </div>
            </Grid>
            <Grid item xl={3} md={3} sm={12} xs={12}>
                <CustomAvatarEditor setImgSrc={setImgSrc}/>

            </Grid>
            <Grid item xl={9} md={9} sm={12} xs={12} style={{margin:'auto'}}>
                
                <div className="sec2-curriculum">
                                    SƠ YẾU LÝ LỊCH 
                                </div>
                                <div className="sec2-narrative">
                                    TỰ THUẬT 
                                </div>
                
            </Grid>
            <Grid item xl={12} md={12} sm={12} xs={12} style={{marginTop:"20px"}}>
                

                <Typography
                variant="h4"
               
                >
                    I. Thông tin cơ bản
                </Typography>
                
            </Grid>
            <Grid container spacing={2}>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-name">Họ và tên :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="fullName"
                                    value={formik.values?.resume?.fullName}
                                    onChange={() => toast.warning('Tên không được sửa', {
                                                position: "top-right",
                                                autoClose: 4000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                                })}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-gender">Giới tính :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="gender"
                                    value={listGender?.find(i => formik.values?.resume?.gender == i.id)?.name}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-birthdate">Ngày sinh :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    name="dateOfBirth"
                                    value={formatData(formik.values?.resume?.dateOfBirth)}
                                    InputProps={{
        readOnly: true,}}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-phone">Số điện thoại :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="phone"
                                    value={formik.values?.resume?.phone}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-email">Email :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="email"
                                    value={formik.values?.resume?.email}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-address">Chỗ ở hiện tại :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="currentAddress"
                                    value={formik.values?.resume?.currentAddress}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-ethnicity">Dân tộc :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="ethnicity"
                                    value={formik.values?.resume?.ethnicity}
                                    onChange={(e) => formik.setFieldValue("resume.ethnicity",e.target.value)}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-religion">Tôn giáo :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="religion"
                                    value={formik.values?.resume?.religion}
                                    onChange={(e) => formik.setFieldValue("resume.religion",e.target.value)}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-citizen">Số CCCD :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="citizenId"
                                    value={formik.values?.resume?.citizenId}
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-daterange">Ngày cấp :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    name="citizenIdIssuanceDate"
                                    value={formatData(formik.values?.resume?.citizenIdIssuanceDate)}
                                    onChange={(e) => formik.setFieldValue("resume.citizenIdIssuanceDate",e.target.value)}
                                    
                                    />
                    </Grid>
                    <Grid item xl={6} md={6} sm={12} xs={12} className="grid-text" >
                        <span className="title-text title-place-of-grant">Nơi cấp :</span>
                                <TextField
                                className="text-dot"
                                    size="small"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        style: {
                                        fontSize: 20,
                                    
                                        },
                                        shrink:true}}
                                    multiline
                                    
                                    variant="standard"
                                    name="citizenIdIssuingAuthority"
                                    value={formik.values?.resume?.citizenIdIssuingAuthority}
                                    onChange={(e) => formik.setFieldValue("resume.citizenIdIssuingAuthority",e.target.value)}
                                    />
                    </Grid>
            </Grid>
        </Grid>
        <Grid container style={{marginTop:"20px"}}>
            <Typography variant="h4">
                II.Quan hệ gia đình
            </Typography>
        </Grid>
            <Grid>
                <TableRelation></TableRelation>
            </Grid>
            <Grid style={{marginTop:"20px"}}>
                <Typography variant="h6" style={{textAlign:"center"}}>LỜI CAM ĐOAN</Typography>
                <Typography variant="body1" style={{fontStyle:"italic"}}>
                Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai của mình.
            </Typography>
            </Grid>
            <Grid container style={{marginTop:"20px"}}>
                <Grid sm={8}></Grid>
                <Grid style={{textAlign:"center"}} sm={4}>
                    {formattedDate}
                    <Typography>
                        Người khai ký tên
                    </Typography>
                    <Typography>
                    (Ký, ghi rõ họ tên)
                    </Typography>
                    <Typography>
                    {formik.values?.resume?.commonName}
                    </Typography>
                    <Typography>
                    {formik.values?.resume?.fullName}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}