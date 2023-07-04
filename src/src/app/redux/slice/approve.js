import { createSlice } from "@reduxjs/toolkit";

const approve = createSlice({
    name:'approve',
    initialState:{},
    reducers :{
        approveEmployeeSlice : (state,action) =>{
            state = action.payload
            // console.log("state",state);
            return state
        },
        requiredSupplementSlice : (state,action) =>{
            state = action.payload
            // console.log("state",state);
            return state
        },
        rejectEmployeeSlice : (state,action) =>{
            state = action.payload
            // console.log("state",state);
            return state
        }
    }
})
export const {approveEmployeeSlice,requiredSupplementSlice,rejectEmployeeSlice} = approve.actions 
export default approve.reducer