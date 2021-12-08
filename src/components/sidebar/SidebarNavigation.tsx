import { ProSidebar, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import SidebarBody from "./components/SidebarBody";
import "react-pro-sidebar/dist/css/styles.css";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { BsGithub } from "react-icons/bs";

const SidebarNavigation: React.FC = function (): JSX.Element {
  const isLoading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  return (
    <div>
      <ProSidebar width="23rem" collapsed={isLoading} collapsedWidth="0px">
        <SidebarHeader>
          <div className="sidebar__header">Sorting Visualizer</div>
        </SidebarHeader>
        <SidebarBody />
        <SidebarFooter>
          <div className="sidebar__footer">
            Made By Joseph
            <span className="sidebar__footer-logo">
              <a
                href="https://github.com/BunAppleTeeth"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
            </span>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SidebarNavigation;
