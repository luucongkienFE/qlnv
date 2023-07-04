import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import MaterialTable from '@material-table/core';
import moment from 'moment';
import { listGender } from 'app/components/moment';

export default function TableRelation() {
    const listGender = useSelector(state => state.dataEmployee.gender)
    const itemRowdata = useSelector((state) =>state.diploma.data?.familyRelations || state.employee?.familyRelations)
   
const columns = [
    { title: "Họ tên", field: "name" },
    {
      title: "Giới tính",
      field: "gender",
      render :(gender) => listGender.find(i => i.id === itemRowdata.gender)?.name
    },
    { title: "Quan hệ", field: "relation" },
    { title: "Ngày sinh", field: "dateOfBirth",render: (rowdata) => moment(rowdata.dateOfBirth).format("DD/MM/YYYY") },
    { title: "Địa chỉ", field: "address" },
    { title: "CCCD", field: "citizenId"},
  ]
  return (
    <Grid container spacing={1}>
            
            <MaterialTable
            
            title={''}
            style={{width:'100%',marginTop:'20px'}}
            columns={columns}
            data={itemRowdata}
            options={{
                paging: true,
                toolbar:false,
                maxBodyHeight:600,
                pageSizeOptions: [],
                headerStyle: {
                  backgroundColor: "#262e49",
                  color: "#fff",
                },
            }}
            localization={{
                pagination: {
                  labelRowsSelect: ''
                },
            }}
            
>
            </MaterialTable>
        
      </Grid>
  );
}