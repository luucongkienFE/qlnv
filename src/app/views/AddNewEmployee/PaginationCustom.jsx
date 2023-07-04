import React,{useEffect, useState} from 'react';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { TextField } from '@mui/material';

export default function PaginationCustom(props) {
  const {handleChangePage,handleChangePageSize,page,pageSize,totalPage} = props

  const handleChangePageIndex = (event, newPage) => {
    
    handleChangePage(newPage);

  };
  const handleChangePageIndex1 = (event, newPage) => {
    handleChangePage(event?.target?.value)
  }
  const handleChangeRowsPerPage = (event) => {
    handleChangePageSize(parseInt(event.target.value, 10));
    handleChangePage(0)
  };

  return (
    <div style={{display:"flex",marginTop:"20px",justifyContent:"center"}}>
      <TablePagination
        component="div"
        count={totalPage}
        page={page}
        rowsPerPageOptions={[1,2,3,5,10,20,30]}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong tổng số ${totalPage}`}
        onPageChange={handleChangePageIndex}
        rowsPerPage={pageSize}
        labelRowsPerPage="Số hàng mỗi trang"
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}