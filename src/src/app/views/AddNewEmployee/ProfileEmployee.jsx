import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Button, DialogActions, Grid, MenuItem } from "@material-ui/core";
import { addListEmployee } from "./AddNewEmployeeService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_EMPLOYEE } from "app/redux/types";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import RegisterDialog from "./RegisterDialog/RegisterDialog";
import CustomAvatarEditor from "./Avatar";

const ProfileEmployee = (props) => {
  const { formik, setImgSrc } = props;
  const dispatch = useDispatch();
  const listGender = useSelector((state) => state.dataEmployee.gender);
  const listTeamId = useSelector((state) => state.dataEmployee.teamId);
  const itemRowdata = useSelector((state) => state.employee);

  
  useEffect(() => {
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid  item lg={4} md={4} sm={12} xs={12}
          container
          spacing={2}
          className="mb-20"
          style={{ marginLeft: "20px" }}
        >
          <div style={{ paddingLeft: "70px" }}>
            <CustomAvatarEditor setImgSrc={setImgSrc} />
          </div>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}
          container
          spacing={2}
          className="mb-20"
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              type="text"
              fullWidth
              label="Họ và tên"
              variant="outlined"
              name="fullName"
              value={formik.values.employeeInfo.fullName}
              onChange={(e) => {
                formik.setFieldValue(`employeeInfo.fullName`, e.target.value);
              }}
              error={
                formik.touched.employeeInfo?.fullName &&
                formik.errors.employeeInfo?.fullName
              }
              helperText={
                formik.touched.employeeInfo?.fullName &&
                formik.errors.employeeInfo?.fullName
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              type="text"
              fullWidth
              label="Mã nhân viên"
              variant="outlined"
              name="code"
              value={formik.values.employeeInfo.code}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  code: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.code &&
                formik.errors.employeeInfo?.code
              }
              helperText={
                formik.touched.employeeInfo?.code &&
                formik.errors.employeeInfo?.code
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              select
              fullWidth
              label="Giới tính"
              variant="outlined"
              name="gender"
              value={formik.values.employeeInfo.gender}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  gender: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.gender &&
                formik.errors.employeeInfo?.gender
              }
              helperText={
                formik.touched.employeeInfo?.gender &&
                formik.errors.employeeInfo?.gender
              }
            >
              {listGender.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Ngày sinh"
              variant="outlined"
              name="dateOfBirth"
              value={moment(formik.values.employeeInfo.dateOfBirth).format(
                "YYYY-MM-DD"
              )}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  dateOfBirth: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.dateOfBirth &&
                formik.errors.employeeInfo?.dateOfBirth
              }
              helperText={
                formik.touched.employeeInfo?.dateOfBirth &&
                formik.errors.employeeInfo?.dateOfBirth
              }
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              type="text"
              fullWidth
              label="Số điện thoại"
              variant="outlined"
              name="phone"
              value={formik.values.employeeInfo.phone}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  phone: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.phone &&
                formik.errors.employeeInfo?.phone
              }
              helperText={
                formik.touched.employeeInfo?.phone &&
                formik.errors.employeeInfo?.phone
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              label="Email"
              fullWidth
              variant="outlined"
              name="email"
              value={formik.values.employeeInfo.email}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  email: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.email &&
                formik.errors.employeeInfo?.email
              }
              helperText={
                formik.touched.employeeInfo?.email &&
                formik.errors.employeeInfo?.email
              }
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              type="text"
              label="CCCD"
              fullWidth
              variant="outlined"
              name="citizenId"
              value={formik.values.employeeInfo.citizenId}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  citizenId: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.citizenId &&
                formik.errors.employeeInfo?.citizenId
              }
              helperText={
                formik.touched.employeeInfo?.citizenId &&
                formik.errors.employeeInfo?.citizenId
              }
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              size="small"
              select
              fullWidth
              label="Nhóm"
              variant="outlined"
              name="teamId"
              value={formik.values.employeeInfo.teamId}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  teamId: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.teamId &&
                formik.errors.employeeInfo?.teamId
              }
              helperText={
                formik.touched.employeeInfo?.teamId &&
                formik.errors.employeeInfo?.teamId
              }
            >
              {listTeamId.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              size="small"
              type="text"
              fullWidth
              label="Địa chỉ cụ thể"
              variant="outlined"
              name="address"
              value={formik.values.employeeInfo.address}
              onChange={(e) => {
                formik.setFieldValue("employeeInfo", {
                  ...formik.values.employeeInfo,
                  address: e.target.value,
                });
              }}
              error={
                formik.touched.employeeInfo?.address &&
                formik.errors.employeeInfo?.address
              }
              helperText={
                formik.touched.employeeInfo?.address &&
                formik.errors.employeeInfo?.address
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default ProfileEmployee;
