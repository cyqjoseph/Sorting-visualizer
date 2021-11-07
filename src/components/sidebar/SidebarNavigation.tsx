import { ProSidebar, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import SidebarBody from "./components/SidebarBody";
import "react-pro-sidebar/dist/css/styles.css";
const SidebarNavigation = function (): JSX.Element {
  return (
    <ProSidebar width="23rem">
      <SidebarHeader>
        <div className="sidebar__header">Sorting Visualizer</div>
      </SidebarHeader>
      <SidebarBody />
      <SidebarFooter>
        <div className="sidebar__footer">Made By Joseph</div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SidebarNavigation;
