import { createSlice } from "@reduxjs/toolkit";

const formEmployee = createSlice({
    name:'formEmployee',
    initialState:{},
    reducers :{
        getFormEmployeeSlice : (state,action) =>{
            state = action.payload
            return state
        },
        updateFormEmployeeSlice:(state,action) => {
            state = action.payload
            return state
        }

    }
})
export const {getFormEmployeeSlice,updateFormEmployeeSlice} = formEmployee.actions 
export default formEmployee.reducer