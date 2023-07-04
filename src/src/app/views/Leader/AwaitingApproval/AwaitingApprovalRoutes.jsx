import Loadable from "app/components/Loadable";
import { lazy } from "react";

const AwaitingApproval = Loadable(lazy(() => import("./AwaitingApproval")));

const AwaitingApprovalRoutes = [{ path: "/awaiting-approval", element: <AwaitingApproval /> }];

export default AwaitingApprovalRoutes;