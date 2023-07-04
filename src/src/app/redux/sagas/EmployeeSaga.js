
import { addEmployeeData, addIncreaseSalaryHistory, addListEmployeeAPI, addProposal, approveEmployee, deleteEmployeeAPI, deleteEmployeeData, getDataByIdAPI, getFormCvByIdAPI, getIncreaseSalaryHistory, getListEmployeeAPI, getListEmployeeDataAPI, getProposal, rejectEmployee, requiredSupplement, updateDataById, updateFormEmployeeAPI } from "app/apis";
import { getListEmployee } from "app/views/AddNewEmployee/AddNewEmployeeService";
import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEE, GET_EMPLOYEE_DATA ,GET_FORM_EMPLOYEE,SET_EMPLOYEE_DATA, UPDATE_EMPLOYEE,GET_DATA_BY_ID, UPDATE_FORM_EMPLOYEE, APPROVE_EMPLOYEE_DATA, REQUIRED_SUPPLEMENT_DATA, REJECT_EMPLOYEE, GET_PROPOSAL, ADD_PROPOSAL, GET_INCREASE_SALARY, ADD_INCREASE_SALARY} from "../types";
import { addEmployeeSlice, deleteEmployeeSlice, editEmployeeSlice, getEmployeeSlice } from "../slice/employees";
import { setEmployeeSlice } from "../slice/employee";
import { getFormEmployeeSlice, updateFormEmployeeSlice } from "../slice/formEmployee";
import diploma, { getDiplomaSlice } from "../slice/diploma";
import { approveEmployeeSlice, rejectEmployeeSlice, requiredSupplementSlice } from "../slice/approve";
import { addProposalSlice, getProposalSlice } from "../slice/proposal";
import { addIncreaseSalaryHistorySlice, getIncreaseSalaryHistorySlice } from "../slice/salary";

export function* getListEmployeeSaga(action,listEmployee){
    try{

        const listEmployee = yield call (getListEmployeeDataAPI,action.statuses,action.page,action.pageSize)
       
       yield put(getEmployeeSlice(listEmployee.data))

    }
    catch(err){
        console.log(err);
    }
}
export function* addListEmployeeSaga(action){
    try{
        yield addEmployeeData(action.values)
       yield getListEmployeeSaga({page:action.page,pageSize:action.pageSize})

    }
    catch(err){
        console.log(err);
    }
}
export function* updateEmployeeSaga(action){
   
    try { 
     yield call(updateDataById,action.values.employeeId,Object.fromEntries(
  Object.entries(action.values).filter(([key, value]) => key !== 'employeeId')
));

yield getListEmployeeSaga({page:action.page,pageSize:action.pageSize})
    //
    }
    catch(err){
        console.log("lỗi",err);
    }
}
export function* updateFormEmployeeSaga(action){
   
    try{ 

       yield call(updateFormEmployeeAPI,action.values.employeeId,action.values)

       yield put(updateFormEmployeeSlice(action.values))


    }
    catch(err){
        console.log("lỗi",err);
    }
}
export function* deleteEmployeeSaga(action){
    try{
        yield call (deleteEmployeeData , action?.id)

       
        yield getListEmployeeSaga({page:action.page+1,pageSize:action.pageSize})

    }
    catch(err){
        console.log(err);
    }
}
export function* setEmployeeSaga(action,values){
    try{
        yield call (addEmployeeData(action.values))
        yield put(addEmployeeSlice(action.values))

    }
    catch(err){
        console.log(err);
    }
}
export function* getFormEmployeeSaga(action){

    try{
        
        const formEmployeeById = yield call (getFormCvByIdAPI,action.id)
        yield put(getFormEmployeeSlice(formEmployeeById.data.data))
    }
    catch(err){
        console.log(err);
    }
}
export function* getDataByIdSaga(action){

    try{

        const dataById = yield call (getDataByIdAPI,action.id)

        yield put(getDiplomaSlice(dataById.data))

    }
    catch(err){
        console.log(err);
    }
}

export function* approveEmployeeSaga(action){
    try{
        const dataById = yield call (approveEmployee,action.id)
        yield put(approveEmployeeSlice(dataById.data))
    }
    catch(err){
        console.log(err);
    }
}

export function* requiredSupplementSaga(action){
    
    try{
        const dataById = yield call (requiredSupplement,action.id,action.statusLog)
        yield put(requiredSupplementSlice(dataById))

    }
    catch(err){
        console.log(err);
    }
}

export function* rejectEmployeeSaga(action){
    
    try{
        const data = yield call (rejectEmployee,action.id,action.rejectedReason)
        yield put(rejectEmployeeSlice(data))

    }
    catch(err){
        console.log(err);
    }
}

export function* getProposalSaga(action){
    try{
        const dataProposal = yield call (getProposal,action.id)
        yield put(getProposalSlice(dataProposal))

    }
    catch(err){
        console.log(err);
    }
}

export function* addProposalSaga(action){
    console.log("ac",action);
    try{
        const dataProposal = yield call (addProposal,action.id,action.type,action.date,action.note,action.content)
        yield put(addProposalSlice(dataProposal))
        console.log("ac",action,dataProposal);
    }
    catch(err){
        console.log(err);
    }
}

export function* getIncreaseSalaryHistorySaga(action){
    try{
        const dataProposal = yield call (getIncreaseSalaryHistory,action.id)
        yield put(getIncreaseSalaryHistorySlice(dataProposal))
        console.log("ac",action,dataProposal);
    }
    catch(err){
        console.log(err);
    }
}

export function* addIncreaseSalaryHistorySaga(action){
    console.log("ac",action);
    try{
        const dataSalary = yield call (addIncreaseSalaryHistory,action.id,action.salary,action.salaryScale,action.count,action.date,action.reason,action.note)
        yield put(addIncreaseSalaryHistorySlice(dataSalary))
        console.log("ac",action,dataSalary);
    }
    catch(err){
        console.log(err);
    }
}

export function* watchEmployeesAsync(){
    yield takeLatest(GET_EMPLOYEE,getListEmployeeSaga)
    yield takeLatest(GET_DATA_BY_ID,getDataByIdSaga)
    yield takeLatest(ADD_EMPLOYEE,addListEmployeeSaga)
    yield takeLatest(DELETE_EMPLOYEE,deleteEmployeeSaga)
    yield takeLatest(UPDATE_EMPLOYEE,updateEmployeeSaga)
    yield takeLatest(UPDATE_FORM_EMPLOYEE,updateFormEmployeeSaga)
    yield takeLatest(SET_EMPLOYEE_DATA,setEmployeeSaga)
    yield takeLatest(GET_FORM_EMPLOYEE,getFormEmployeeSaga)
    yield takeLatest(APPROVE_EMPLOYEE_DATA,approveEmployeeSaga)
    yield takeLatest(REQUIRED_SUPPLEMENT_DATA,requiredSupplementSaga)
    yield takeLatest(REJECT_EMPLOYEE,rejectEmployeeSaga)
    yield takeLatest(GET_PROPOSAL,getProposalSaga)
    yield takeLatest(ADD_PROPOSAL,addProposalSaga)
    yield takeLatest(GET_INCREASE_SALARY,getIncreaseSalaryHistorySaga)
    yield takeLatest(ADD_INCREASE_SALARY,addIncreaseSalaryHistorySaga)
}