import { createSlice } from "@reduxjs/toolkit";

const salary = createSlice({
    name:'salary',
    initialState:{},
    reducers :{
        getIncreaseSalaryHistorySlice : (state,action) =>{
            state = action.payload
            return state
        },
        addIncreaseSalaryHistorySlice : (state,action) =>{
            state = action.payload
            return state
        },
    }
})
export const {getIncreaseSalaryHistorySlice,addIncreaseSalaryHistorySlice} = salary.actions 
export default salary.reducer