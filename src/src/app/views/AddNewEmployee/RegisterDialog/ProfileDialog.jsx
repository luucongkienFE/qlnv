import React, { useEffect, useState } from "react";
import CustomAvatarEditor from "../Avatar";
import { Button, Grid, Typography } from "@material-ui/core";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import '../../../styles/Register.scss'
import { useFormik } from "formik";
import {TextField,InputAdornment} from "@material-ui/core";
import TransgenderIcon from '@mui/icons-material/Transgender';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PersonIcon from '@mui/icons-material/Person';
import { formatData } from "app/components/moment";
import "../../../styles/ProfileDialog.scss"
import { GET_FORM_EMPLOYEE } from "app/redux/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProfileDialog (props){
    const {formik,setImgSrc} = props
    const dispatch = useDispatch()
    const itemRowdata =useSelector(state => state.employee?.employeeInfo || state.employee)
        


    const listGender = useSelector(state => state.dataEmployee.gender)

    

    const handleAddExp = () =>{
        formik.setFieldValue("cv.workExperiences",[...formik.values?.cv.workExperiences,{
            company: "",
            position: "",
            detail: "",
            startDate: "",
            endDate: ""
        }
        ])
        
    }
    const handleRemoveExp =(workExpId) =>{
        const newValues = []
       
        formik.values?.cv.workExperiences?.map(item=> {
            if(item.workExpId !== workExpId)
                newValues.push(item)
        })
        formik.setFieldValue("cv",{...formik.values?.cv, workExperiences: [...newValues]});
    }
   
    return(
       <>
        <div className="main-profile fullwidth main">
            <Grid container>
                <Grid item lg={3} md={3} sm={12} xs={12} spacing={2} className="mb-20 main__grid">
                    <CustomAvatarEditor setImgSrc={setImgSrc}/>
                    <Typography className="toobar-left-title">
                        Thông tin cá nhân
                    </Typography>
                    <div style={{margin:"0 20px"}}>
                            <div className="fullwidth d-flex"
                            
                            >
                                <PersonIcon className="icon-size" />
                                
                                <Typography
                                    className="toobar-left"
                                    style={{
                                        textAlign:"center"
                                    }}
                                    
                                >
                                { itemRowdata?.fullName}

                                </Typography>
                                
                                
                            </div>
                            <div className="d-flex">
                                <CalendarMonthIcon className="icon-size" />
                                <Typography
                                    className="toobar-left"
                                    style={{
                                        textAlign:"center"
                                    }}
                                    
                                >
                                {moment( itemRowdata?.dateOfBirth).format("DD/MM/YYYY")}
                                </Typography>
                            </div>
                                <div className="d-flex">
                                    <LocalPhoneIcon className="icon-size"/>
                                    <Typography
                                    className="toobar-left"
                                    style={{
                                        textAlign:"center"
                                    }}
                                    
                                >
                                { itemRowdata?.phone}
                                </Typography>
                                </div>
                                
                                <div className="d-flex">
                                        <EmailIcon className="icon-size"/>
                                        <Typography
                                            className="toobar-left"
                                            style={{
                                                textAlign:"center"
                                            }}
                                            
                                        >
                                        { itemRowdata?.email}
                                        </Typography>
                                </div>
                                <div className="d-flex">
                                    <TransgenderIcon className="icon-size"/>
                                    <Typography
                                            className="toobar-left"
                                            style={{
                                                textAlign:"center"
                                            }}
                                            
                                        >
                                        {listGender?.find(i =>  itemRowdata?.gender == i.id)?.name}
                                        </Typography>
                                </div>
                                <div className="d-flex">
                                    <InfoIcon className="icon-size"/>
                                    <Typography
                                            className="toobar-left"
                                            style={{
                                                textAlign:"center"
                                            }}
                                            
                                        >
                                        { itemRowdata?.address}
                                        </Typography>
                                    
                                </div>
                          
                            
                        </div>
                </Grid>
                <Grid item lg={9} md={9} sm={12} xs={12} spacing={2} className="mb-20 main__grid--bot" >
                <div className="field-text skill">
                <TextField
                            size="small"
                            type="text"
                            fullWidth
                            InputLabelProps={{
                                style: {
                                  fontSize: 20},
                                shrink:true}}
                            multiline
                            label="Kỹ năng"
                            variant="standard"
                            name="skill"
                            value={formik.values?.cv?.skill}
                             onChange={(e) => formik.setFieldValue("cv.skill",e.target.value)}
                            />
                </div>
                <div  className="field-text career-goal">
                        <TextField
                            size="small"
                            type="text"
                            fullWidth
                            multiline
                            InputLabelProps={{
                                style: {
                                  fontSize: 20},
                                shrink:true}}
                            label="Mục tiêu nghề nghiệp"
                            variant="standard"
                            name="careerGoal"
                            value={formik.values?.cv?.careerGoal}
                            onChange={(e) => formik.setFieldValue("cv.careerGoal",e.target.value)}
                            />
                    </div>
                <div className="field-text hobby">
                        <TextField
                            size="small"
                            type="text"
                            fullWidth
                            multiline
                            InputLabelProps={{
                                style: {
                                  fontSize: 20},
                                shrink:true}}
                            label="Sở thích"
                            variant="standard"
                            name="hobby"
                            value={formik.values?.cv?.hobby}
                            onChange={(e) => formik.setFieldValue("cv.hobby",e.target.value)}
                            />
                        
                    </div>
                    <div className="d-flex">
                    <Typography
                            className="toobar-left toobar-left-title"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <InfoIcon className="icon-size"/>
                                </InputAdornment>
                                ),
                            }}
                            >Kinh ngiệm làm việc
                    </Typography>
                    <button type="button" className="work-button-add" onClick={handleAddExp}><AddIcon/></button>
                    </div>      
                    <div style={{
                            overflowY:"auto",
                            overflowX:"hidden",
                            maxHeight:"330px"
                    }}>
        {formik.values?.cv?.workExperiences?.map((exp,index) => (
                        <div key={index} className="work-map-boder">
                            <Grid container spacing={2} className="work-map-padding">
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <TextField
                                            id={`workExperiences.${index}.startDate`}
                                            name="startDate"
                                            label="Ngày bắt đầu"
                                            type="date"
                                            value={moment(exp.startDate).format("YYYY-MM-DD")}
                                            
                                            onChange={(e) => {
                                            formik.setFieldValue(`cv.workExperiences[${index}].startDate`, e.target.value);
                                           
                                            }}
                                        InputLabelProps={{
                                            style: {
                                            fontSize: 20},
                                            shrink:true}}
                                        />
                                    </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField
                                InputLabelProps={{
                                    style: {
                                    fontSize: 20},
                                    shrink:true}}
                                label="Ngày kết thúc"
                                id={`workExperiences.${index}.endDate`}
                                    name="endDate"
                                    
                                    type="date"
                                    value={moment(exp.endDate).format("YYYY-MM-DD")}
                                    onChange={(e) => {
                                    formik.setFieldValue(`cv.workExperiences[${index}].endDate`, e.target.value);}}
            
                                />
                            </Grid>


                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                multiline
                                fullWidth
                                InputLabelProps={{
                                    style: {
                                    fontSize: 20},
                                    shrink:true}}
                                label="Tên công ty"
                                id={`workExperiences.${index}.company`}
                                    name={`workExperiences[${index}].company`}
                                    type="text"
                                    value={formik.values?.cv.workExperiences[index].company}
                                    onChange={(e) => {
                                    formik.setFieldValue(`cv.workExperiences[${index}].company`, e.target.value);}}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                multiline
                                fullWidth
                                InputLabelProps={{
                                    style: {
                                    fontSize: 20},
                                    shrink:true}}
                                label="Vị trí"
                                id={`workExperiences.${index}.position`}
                                    name={`workExperiences[${index}].position`}
                                    type="text"
                                    value={formik.values?.cv.workExperiences[index].position}
                                    onChange={(e) => {
                                    formik.setFieldValue(`cv.workExperiences[${index}].position`, e.target.value);}}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                multiline
                                fullWidth
                                InputLabelProps={{
                                    style: {
                                    fontSize: 20},
                                    shrink:true}}
                                label="Mô tả công việc"
                            
                                id={`workExperiences.${index}.detail`}
                                    name={`workExperiences[${index}].detail`}
                                
                                    type="text"
                                    value={formik.values?.cv.workExperiences[index].detail}
                                    onChange={(e) => {
                                    formik.setFieldValue(`cv.workExperiences[${index}].detail`, e.target.value);}}
                                />
                            </Grid>
                            </Grid>
                            <button type="button" className="work-button-remove" onClick={()=>handleRemoveExp(exp.workExpId)}><RemoveIcon/></button>
                    </div>
                    ))}
                    </div>
        </Grid>
        </Grid>
        </div>
       
        </>
        
    )
}
