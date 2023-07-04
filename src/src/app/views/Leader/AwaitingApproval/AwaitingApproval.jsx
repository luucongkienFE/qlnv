import react, { useEffect, useState } from "react";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { useDispatch, useSelector } from "react-redux";
import PaginationCustom from "app/views/AddNewEmployee/PaginationCustom";
import { GET_DATA_BY_ID, GET_EMPLOYEE, GET_FORM_EMPLOYEE } from "app/redux/types";
import { Icon, IconButton, Tooltip } from "@mui/material";
import moment from "moment/moment";
import "../../../styles/AwaitingApprovalStyle.scss";
import { setEmployeeSlice } from 'app/redux/slice/employee';
import ModalFileEmployee from "./component/ModalFileEmployee";

function AwaitingApproval() {
  const dispatch = useDispatch();
  const dataEmployee = useSelector((state) => state.employees.data);
  const status = useSelector((state) => state.dataEmployee.status);
  const formEmployee = useSelector((state) => state.formEmployee);
  const statusAwaiting = [3, 8];



  const [page, setPage] = useState(0);
  const [idEmployee, setIdEmployee] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState();
  const [reRender, setReRender] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  const handleChangePage = (page) => {
    setPage(page);
  };
  const handleChangePageSize = (pageSize) => {
    setPageSize(pageSize);
  };
  useEffect(() => {
    dispatch({
      type: GET_EMPLOYEE,
      statuses: statusAwaiting,
      page: page + 1,
      pageSize,
    });
  }, [page, pageSize,reRender]);
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Xem chi tiết">
              <span>
                <IconButton
                  onClick={() => {
                    setShouldOpenDialog(true);
                    dispatch( dispatch({
                      type: GET_FORM_EMPLOYEE,
                      id:rowData.employeeId
                    }));
                    dispatch( dispatch({
                      type: GET_DATA_BY_ID,
                      id:rowData.employeeId
                    }));
                    setIdEmployee(rowData.employeeId)
                  }}
                >
                  <Icon color={"success"}>visibilityIcon</Icon>
                </IconButton>
              </span>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ tên", field: "fullName" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      render: (rowdata) => moment(rowdata.dateOfBirth).format("DD/MM/YYYY"),
    },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    { title: "Team", field: "teamId" },
    { title: "Địa chỉ", field: "address" },
    {
      title: "Trạng thái",
      field: "status",
      render: (rowData) =>
        status.find((status) => rowData.status == status.id)?.name,
    },
  ];
  return (
    <div>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Lãnh đạo", path: "/" },
            { name: "Chờ duyệt" },
          ]}
        />
      </div>
      <div className="content-table">
        <div className="table-approval">
          <MaterialTable
            title={"CHỜ LÃNH ĐẠO DUYỆT"}
            columns={columns}
            data={dataEmployee}
            options={{
              headerStyle: {
                backgroundColor: "#f1f1f1",
                fontWeight: "bold",
              },
              paging: false,
              toolbar: false,
              maxBodyHeight: 600,
            }}
          />
        </div>
        <PaginationCustom
          totalPage={totalPage}
          page={page}
          pageSize={pageSize}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangePageSize}
        />
        {shouldOpenDialog&&<ModalFileEmployee setOpenModalFile={setShouldOpenDialog} openModalFile={shouldOpenDialog} id={idEmployee} setReRender={setReRender} reRender={reRender}  />}
      </div>
    </div>
  );
}

export default AwaitingApproval;
