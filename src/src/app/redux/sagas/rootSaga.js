import { all } from "redux-saga/effects";
import { watchEmployeesAsync } from "./EmployeeSaga";

export function* rootSaga() {
    yield all([
        watchEmployeesAsync()
    ])
}