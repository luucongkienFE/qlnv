import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
function MoreInfoDialog(props) {
  const { handleClose, openEditDialog, display, title } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  // console.log(employeeData);
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {employeeData.additionalRequest ? "Yêu cầu bổ sung" : "Từ chối"}

        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 10 }}>
        <Typography>
          {employeeData.additionalRequest?.content ? "" : "Lý do:"}{" "}
          {employeeData.additionalRequest?.content || employeeData.refuseInfo?.content}
        </Typography>
        <Typography></Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2, display: employeeData.refuseInfo ? "none" : "" }}
          onClick={openEditDialog}
        >
          Bổ sung thông tin
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MoreInfoDialog;
