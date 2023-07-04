import Layout from "./components/Layout/Layout";

import NotFound from "./components/NotFound";
import AddNewEmployeeRoutes from "./views/AddNewEmployee/AddNewEmployeeRoutes";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
     ...AddNewEmployeeRoutes
    ],
  },

  { path: "*", element: <NotFound /> },
];

export default routes;
