import Loadable from "app/components/Loadable";
import { lazy } from "react";

const EmployeeDiploma = Loadable(lazy(() => import("./EmployDiploma")));

const EmployeeDiplomaRoutes = [{ path: "/diploma_employee", element: <EmployeeDiploma /> }];

export default EmployeeDiplomaRoutes;