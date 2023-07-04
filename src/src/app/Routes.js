import Layout from "./components/Layout/Layout";

import NotFound from "./components/NotFound";
import AddNewEmployeeRoutes from "./views/AddNewEmployee/AddNewEmployeeRoutes";
import ApprovedRoutes from "./views/Leader/Approved/ApprovedRoutes";
import AwaitingApprovalRoutes from "./views/Leader/AwaitingApproval/AwaitingApprovalRoutes";
import ManageEmployeeRoutes from "./views/ManageEmployee/ManageEmployeeRoutes";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
     ...AddNewEmployeeRoutes
    ],
  },
  {
    path: "/awaiting-approval",
    element: <Layout />,
    children: [
     ...AwaitingApprovalRoutes
    ],
  },
  {
    path: "/approved",
    element: <Layout />,
    children: [
     ...ApprovedRoutes
    ],
  },
  {
    path: "/manage_employee",
    element: <Layout />,
    children: [
     ...ManageEmployeeRoutes
    ],
  },

  { path: "*", element: <NotFound /> },
];

export default routes;
