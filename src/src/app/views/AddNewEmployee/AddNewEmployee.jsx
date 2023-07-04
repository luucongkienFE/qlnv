
import Breadcrumb from 'app/components/Breadcrumb'
import { Box,styled ,Button,Grid,Tooltip,IconButton,Icon} from '@mui/material'
import AddNewEmployeeDialog from './AddNewEmployeeDialog';
import React,{ useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DELETE_EMPLOYEE, GET_EMPLOYEE } from 'app/redux/types';
import { getTotalPage } from 'app/apis';
import { setEmployeeSlice } from 'app/redux/slice/employee';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginationCustom from './PaginationCustom';
import DeleteConfirmationDialog from './DeleteConfirmDialog';
const Container = styled("div")(() => ({
  margin: "30px",
  "& .breadcrumb": {
    marginBottom: "30px",
  },
}));

function AddNewEmployee(handleClickOpenRegister) {
  const itemRowdata = useSelector(state => state.employee)
  const dispatch = useDispatch()
  const dataEmployee = useSelector(state => state.employees.data)
  const status = useSelector(state => state.dataEmployee.status)
  const [page, setPage] = useState(0)
  const [pageSize,setPageSize] = useState(5)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPage,setTotalPage]= useState()
  const [rowDatas,setRowDatas]= useState()
  const getStatus = [1,2,3,4,5]
  const [openRegisterDialog,setOpenRegisterDialog]=useState(false)

  
  const handleChangePage = (page) =>{
    setPage(page)
  }
  const handleChangePageSize = (pageSize) =>{
    setPageSize(pageSize)
  }
  
  useEffect(()=>{
    dispatch({type:GET_EMPLOYEE,statuses:getStatus ,page:page+1,pageSize})
    setTimeout(() =>{

      getTotalPage().then(res => setTotalPage(res.data.data))
    },1000)
  },[page,pageSize])
  useEffect(()=>{
  
},[])
const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

const handleClickOpen =() =>{
  setShouldOpenDialog(true)
  
}
const handleClickClose =() =>{
    
    setShouldOpenDialog(false)
    dispatch(setEmployeeSlice({}))
    
}

const handleChangeEmployee = (rowData) =>{
  handleClickOpen()
  
  if(!rowData.tableData.uuid){
  }else{
    dispatch(setEmployeeSlice(rowData))
  }
}


const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const [openViewEmployeeDialog, setOpenViewEmployeeDialog] = useState(false);
  const [isView, setIsView] = useState(false);

  const handleOpenRegisterDialog = (rowData) => {
    if(rowData.tableData.uuid){
      dispatch(setEmployeeSlice(rowData))
      
    }
    setIsView(true)
    setOpenViewEmployeeDialog(true)
  };

  const handleDelete = (rowDatas) =>{
    if(rowDatas.status == 1 ){
                    dispatch({type:DELETE_EMPLOYEE,id:rowDatas.employeeId,page,pageSize})
                    
                    toast.success('Xóa thành công', {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });
                  }else{
                    toast.error('Xóa thất bại', {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });
                  }
  }



const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
 
            <Tooltip title="Thông tin">
              <span>

              <IconButton
                disabled={rowData.additionalRequest || rowData.refuseInfo ? false : true}
                onClick={() => {
                  dispatch(getEmployeeData(rowData));
                  setShouldOpenRequestDialog(true);
                }}
                >
                <Icon
                  color={rowData.additionalRequest || rowData.refuseInfo ? "primary" : "disabled"}
                  >
                  report
                </Icon>
              </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <span>
              <IconButton
                onClick={() => handleOpenRegisterDialog(rowData, 1)}
              >
                <Icon color={rowData.status !== "Lưu mới" ? "success" : "disabled"}>
                  visibilityIcon
                </Icon>
              </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Sửa">
              <span>
              <IconButton onClick={() => handleChangeEmployee(rowData, 1)}>
                <Icon color="primary">edit</Icon>
              </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Xóa">
              <span>
              <IconButton
                onClick={() => {
                  handleOpenDialog()
                  setRowDatas(rowData)

                }}
              >
                <Icon color={rowData.status === "Lưu mới" ? "error" : "disabled"}>delete</Icon>
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
    { title: "Trạng thái", field: "status", render:(rowData) =>status.find(status=>rowData.status==status.id)?.name},
  ];


  
  return (
    <div className='.MuiDialog-paperFullWidth'>
               
        <Container>
          
        <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Quản lý", path: "/" }, { name: "Thêm mới nhân viên" }]}
        />
        </Box>
        <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={handleClickOpen}
          
        >
          Thêm mới
        </Button>
      </Box>
    

        <DeleteConfirmationDialog open={openDialog} 
        onClose={handleCloseDialog} 
        onDelete={()=>handleDelete(rowDatas)}
        />




      <Grid container spacing={1}>
            
            <MaterialTable
            title={''}
            style={{width:'100%',marginTop:'20px'}}
            columns={columns}
            data={dataEmployee}
            options={{
              paging: false,
              toolbar:false,
              maxBodyHeight:600,
           
              headerStyle:{
                backgroundColor: '#262e49',
                color:"#fff"
              }
            }}
          
            >

            </MaterialTable>
        
      </Grid>
      <PaginationCustom 
      totalPage={totalPage}
      page={page}
      pageSize={pageSize}
      handleChangePage={handleChangePage}
      handleChangePageSize={handleChangePageSize}
      />
      {(shouldOpenDialog || isView) && (
        <AddNewEmployeeDialog 
        page={page}
        pageSize={pageSize}
        isView={isView}
        setIsView={setIsView}
        setShouldOpenDialog={setShouldOpenDialog}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        />
      )}
      </Container>
    </div>
  )
}
export default AddNewEmployee;
