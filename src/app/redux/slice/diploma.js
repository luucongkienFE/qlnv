import { createSlice } from "@reduxjs/toolkit";

const diploma = createSlice({
    name:'diploma',
    initialState:{
    },
    reducers :{
        getDiplomaSlice : (state,action) =>{
            state = action.payload
            return state
        }
    }
})
export const {getDiplomaSlice} = diploma.actions 
export default diploma.reducer