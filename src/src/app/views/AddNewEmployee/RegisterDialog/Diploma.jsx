
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import MaterialTable from '@material-table/core';
import moment from 'moment';
const columns = [
    { title: "Họ tên", field: "name" },
    { title: "Nội dung", field: "content" },
    { title: "Lĩnh vực", field: "field" },
    {title: "Ngày cấp",field: "issuanceDate",render : (rowData) => moment(rowData).format("DD-MM-YYYY")},
  ]
export default function Diploma (){
    const itemRowdata = useSelector((state) =>state.diploma.data.certificates || state.employee?.certificates)
    return(
        <>
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
                pageSizeOptions: [1, 3, 5, 10],
                headerStyle: {
                  backgroundColor: "#262e49",
                  color: "#fff",
                },
            }}
            >

            </MaterialTable>
        
      </Grid>
        </>
    )
}
