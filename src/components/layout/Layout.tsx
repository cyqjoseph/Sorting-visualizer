import MainContainer from "../main/MainContainer";
import Settings from "../settings/Settings";
import { useState } from "react";
const Layout: React.FC = function (): JSX.Element {
  const [settings, setSettings] = useState<{
    length: number;
    iteration: number;
    randomize: boolean;
    loading: boolean;
  }>({ length: 5, iteration: 0.004, randomize: false, loading: false });

  const submitHandler = function (
    length: number,
    iteration: number,
    randomize: boolean,
    loading: boolean
  ): void {
    setSettings({ length, iteration, randomize, loading });
  };
  return (
    <div className="layout">
      <Settings onSubmit={submitHandler} />
      <MainContainer settings={settings} />
    </div>
  );
};
export default Layout;
