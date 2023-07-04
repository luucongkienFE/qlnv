import { createSlice } from "@reduxjs/toolkit";

const employees = createSlice({
    name:'employees',
    initialState:{
        
    },
    reducers :{
        getEmployeeSlice : (state,action) =>{
            
            state = action.payload
            return state
        },
        addEmployeeSlice : (state,action) =>{
            state = action.payload
            return state
        },
        editEmployeeSlice : (state,action) =>{
                state = action.payload
                return state
        },
        deleteEmployeeSlice : (state,action) =>{
            state = state.filter(i => i.id !== action.payload.id)
            return state
        }
    }
})
export const {getEmployeeSlice,addEmployeeSlice,editEmployeeSlice,deleteEmployeeSlice} = employees.actions 
export default employees.reducer