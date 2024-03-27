import { SidebarMenu } from "./SidebarMenu";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <>
      <Image
        src="/images/logos/logo.jpg"
        width={199}
        height={80}
        alt="CPS Logo"
      />
      <SidebarMenu />
    </>
  );
};
