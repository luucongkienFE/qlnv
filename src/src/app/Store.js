// import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./reducers/rootReducer";
// import rootSaga from "app/sagas/rootSaga";
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);
// export default store;

import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './redux/sagas/rootSaga';
import { configureStore } from '@reduxjs/toolkit';
import employee from './redux/slice/employee';
import employees from './redux/slice/employees';
import dataEmployee from './redux/slice/dataEmployee';
import formEmployee from './redux/slice/formEmployee';
import diploma from './redux/slice/diploma';
import approve from './redux/slice/approve';
import proposal from './redux/slice/proposal';
import salary from './redux/slice/salary';
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer:{
    diploma:diploma,
    formEmployee:formEmployee,
    employee:employee,
    employees:employees,
    dataEmployee:dataEmployee,
    approve:approve,
    proposal:proposal,
    salary:salary,
  },
  middleware:[sagaMiddleware]
});
sagaMiddleware.run(rootSaga);
export default store;