import { DashboardIcon } from "@/modules/common/components/ui/icons";

const PATH_NAME = {
  dashboard: "dashboard",
};

export const ROUTE_TITLE_PAGE = {
  [PATH_NAME.dashboard]: "Role & Account Management",
};

export const ROUTE_NAME = {
  [PATH_NAME.dashboard]: "Dashboard",
};

export const ROUTE_MAP = [
  {
    key: PATH_NAME.dashboard,
    path: PATH_NAME.dashboard,
    icon: DashboardIcon,
  },
];
