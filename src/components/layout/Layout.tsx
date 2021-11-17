import MainContainer from "../main/MainContainer";
import Settings from "../settings/Settings";
import { useState } from "react";
const Layout: React.FC = function (): JSX.Element {
  const [settings, setSettings] = useState<{
    length: number;
    iteration: number;
    randomize: boolean;
  }>({ length: 5, iteration: 1, randomize: false });

  const submitHandler = function (length: number, iteration: number): void {
    // will trigger sorting logic here
    setSettings({ length, iteration, randomize: false });
  };

  const randomizeHandler = function (): void {
    setSettings({ ...settings, randomize: true });
  };
  return (
    <div className="layout">
      <Settings onSubmit={submitHandler} onRandomize={randomizeHandler} />
      <MainContainer settings={settings} />
    </div>
  );
};
export default Layout;
