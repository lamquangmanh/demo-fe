import { ProtectedLayout } from "@/modules/common/layouts";
import { ReactElement } from "react";

export default function Page() {
  return <div className="font-bold">Dashboard</div>;
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
