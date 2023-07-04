import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Dialog, DialogActions } from "@material-ui/core";
import ProfileDialog from "./ProfileDialog";
import CurriculumVitae from "./CurriculumVitae";
import Diploma from "./Diploma";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UPDATE_FORM_EMPLOYEE } from "app/redux/types";
import moment from "moment";
import { updateFormEmployeeAPI } from "app/apis";
import SendToBoss from "./SendToBoss";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function RegisterDialog(props) {
  const dispatch = useDispatch();
  const {handleClickOpenRegister, handleClickCloseRegister, setImgSrc ,setOpenRegisterDialog,setShouldOpenDialog} =
    props;
  const [value, setValue] = useState(0);
  const itemRowdata=  useSelector((state) => state.employee);

  let dataFormEmployee = useSelector((state) => state.formEmployee);
  
  useEffect(() => {
    if (itemRowdata?.employeeId) {
      formik.setValues(dataFormEmployee);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      resume: {
        fullName: "",
        commonName: "",
        code: "",
        phone: "",
        email: "",
        gender: 0,
        address: "",
        currentAddress: "",
        citizenId: "",
        citizenIdIssuanceDate: "",
        citizenIdIssuingAuthority: "",
        dateOfBirth: "",
        ethnicity: "",
        religion: "",
        photoUrl: "",
      },
      cv: {
        careerGoal: "",
        skill: "",
        hobby: "",
        workExperiences: [],
      },
    },
    onSubmit: (values) => {
      const resume = {
        fullName: formik.values.resume.fullName,
        commonName: formik.values.resume.commonName,
        currentAddress: formik.values.resume.currentAddress,
        citizenId: formik.values.resume.citizenId,
        citizenIdIssuanceDate: moment(
          formik.values.resume.citizenIdIssuanceDate
        ).format("YYYY-MM-DD"),
        citizenIdIssuingAuthority:
          formik.values.resume.citizenIdIssuingAuthority,
        ethnicity: formik.values.resume.ethnicity,
        religion: formik.values.resume.religion,
        commonName: "",
        currentAddress: "",
      };
   
      values = { ...formik.values, resume: resume}
      values.employeeId = itemRowdata?.employeeInfo?.employeeId || itemRowdata?.employeeId
   
      dispatch({ type: UPDATE_FORM_EMPLOYEE, values });
      setOpenButtonSendToBoss(true)
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const [openSendToBoss, setOpenSendToBoss] = useState(false);

  const handleOpenSendToBoss = () => {
    setOpenSendToBoss(true);
  };
  const handleCloseSendToBoss = () => {
    setOpenSendToBoss(false);
  };
  const [openButtonSendToBoss,setOpenButtonSendToBoss] =useState(false)
  
  

  return (
    <Dialog
      open={handleClickOpenRegister}
      onClose={handleClickCloseRegister}
      fullWidth
      maxWidth="lg"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              label="Hồ Sơ"
              {...a11yProps(0)}
              style={{ padding: "0 30px" }}
            />
            <Tab
              label="Sơ Yếu Lý Lịch"
              {...a11yProps(1)}
              style={{ padding: "0 30px" }}
            />
            <Tab
              label="Văn Bằng"
              {...a11yProps(2)}
              style={{ padding: "0 30px" }}
            />
          </Tabs>
          <TabPanel value={value} index={0} style={{ width: "100%" }}>
            <ProfileDialog formik={formik} setImgSrc={setImgSrc} />
          </TabPanel>
          <TabPanel value={value} index={1} style={{ width: "100%" }}>
            <CurriculumVitae formik={formik} setImgSrc={setImgSrc} />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ width: "100%" }}>
            <Diploma formik={formik} />
          </TabPanel>
        </Box>

        <DialogActions className="action-button">
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            type="submit"
          >
            LƯU
          </Button>
          { openButtonSendToBoss && <Button
            variant="contained" color="secondary"
            sx={{ mb: 2 }}
            onClick={handleOpenSendToBoss}
          >
            Gửi lãnh đạo
          </Button>}
          <Button onClick={handleClickCloseRegister}>HỦY</Button>
        </DialogActions>
        {openSendToBoss && (
          <SendToBoss
          setShouldOpenDialog={setShouldOpenDialog}
            setOpenRegisterDialog={setOpenRegisterDialog}
            handleOpenSendToBoss={handleOpenSendToBoss}
            handleCloseSendToBoss={handleCloseSendToBoss}
          />
        )}
      </form>
    </Dialog>
  );
}
