import axios from "axios";
const API_LINK = "http://em-dev.oceantech.com.vn/em/employees";
const token = localStorage.getItem("access_token");
const headers = {
  headers: {
    Authorization: ` bearer ${token}`,
  },
};
export const getListEmployeeDataAPI = async (statuses, page, pageSize) => {

  return await axios.get(
    `${API_LINK}?statuses=${statuses}&page=${page}&size=${pageSize}`,
    headers
  );
};
export const getDataByIdAPI = async (id) => {

  return await axios.get(`${API_LINK}/${id}`, headers);
};
export const getFormCvByIdAPI = async (id) => {

  return await axios.get(`${API_LINK}/${id}/form`, headers);
};

export const getTotalPage = async () => {

  return await axios.get(`${API_LINK}/total?statuses=1,2,3,4,6`, headers);
};
export const updateDataById = async (id, values) => {

  return await axios.put(`${API_LINK}/${id}`, values, headers);
};
export const updateFormEmployeeAPI = async (id, values) => {

  return await axios.put(`${API_LINK}/${id}/form`, values, headers);
};
export const addEmployeeData = async (values) => {

  console.log("token", token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return await axios.post(`${API_LINK}`, values, headers);
};
export const deleteEmployeeData = async (id) => {

  return await axios.put(
    `${API_LINK}/${id}/status`,
    { status: 14 },
    headers
  );
};

export const approveEmployee = async (id) => {
  return await axios.put(
    `${API_LINK}/${id}/status`,
    { employeeId: id, status: 5 },
    headers
  );
};

export const requiredSupplement = async (id, statusLog) => {
  return await axios.put(
    `${API_LINK}/${id}/status`,
    { employeeId: id, status: 5, statusLog: statusLog },
    headers
  );
};
export const rejectEmployee = async (id, rejectedReason) => {
  return await axios.put(
    `${API_LINK}/${id}/status`,
    { employeeId: id, status: 6, rejectedReason: rejectedReason },
    headers
  );
};

export const getProposal = async (id) => {

  return await axios.get(
    `${API_LINK}/${id}/propose-consult`,
    headers, { params: { page: 1, size: 20 } },
  );
};
export const addProposal = async (id, type, date, note, content) => {

  return await axios.post(
    `${API_LINK}/${id}/propose-consult`, { type: type, date: date, note: note, content: content },
    headers, { params: { page: 1, size: 20 } },
  );
};

export const getIncreaseSalaryHistory = async (id) => {

  return await axios.get(
    `${API_LINK}/${id}/increase-salary`,
    headers, { params: { page: 1, size: 20 } },
  );
};
export const addIncreaseSalaryHistory = async (id, salary, salaryScale, count, date, reason, note) => {
  return await axios.post(
    `${API_LINK}/${id}/increase-salary`, { salary: salary, salaryScale: salaryScale, count: count, date: date, reason: reason, note: note }, { params: { page: 1, size: 20 } }, {
    headers: {
        Authorization: `Bearer ${token}`,
        "reason-Type": "application/json"
      }
  }

  );
};







