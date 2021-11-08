import MainContainer from "../main/MainContainer";
import Settings from "../settings/Settings";
const Layout = function (): JSX.Element {
  return (
    <div className="layout">
      <Settings />
      <MainContainer />
    </div>
  );
};
export default Layout;
