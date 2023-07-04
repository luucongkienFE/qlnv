import React from "react";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GET_INCREASE_SALARY, GET_PROPOSAL } from "app/redux/types";
import RegisterFile from "./RegisterFile";
import IncreaseSalary from "./IncreaseSalary";

function CollapseForm() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();

  const dataEmployee = useSelector((state) => state.diploma.data);
  console.log("data", dataEmployee);

  const onCollapseChange = (key) => {
    switch (key.join()) {
      case "1":
        dispatch({
          type: GET_PROPOSAL,
          id: dataEmployee?.employeeInfo?.employeeId,
        });
        break;
      case "2":
        dispatch({
          type: GET_INCREASE_SALARY,
          id: dataEmployee?.employeeInfo?.employeeId,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Collapse accordion onChange={(key) => onCollapseChange(key)}>
      <Panel header="Đăng ký hồ sơ" key="1">
        <RegisterFile />
      </Panel>
      <Panel header="Tăng lương" key="2">
        <IncreaseSalary />
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>aaaaa</p>
      </Panel>
    </Collapse>
  );
}

export default CollapseForm;
