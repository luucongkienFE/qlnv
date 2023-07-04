import { createSlice } from "@reduxjs/toolkit";

const employee = createSlice({
    name:'employee',
    initialState:{},
    reducers :{
        setEmployeeSlice : (state,action) =>{
            state = action.payload
            return state
        }
    }
})
export const {setEmployeeSlice} = employee.actions 
export default employee.reducer