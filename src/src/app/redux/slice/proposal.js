import { createSlice } from "@reduxjs/toolkit";

const proposal = createSlice({
    name:'proposal',
    initialState:{},
    reducers :{
        getProposalSlice : (state,action) =>{
            state = action.payload
            return state
        },
        addProposalSlice : (state,action) =>{
            state = action.payload
            return state
        },
    }
})
export const {getProposalSlice,addProposalSlice} = proposal.actions 
export default proposal.reducer