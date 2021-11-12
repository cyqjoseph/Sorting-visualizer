import React, { useState } from "react";

export interface ContextInterface {
  start: boolean;
  startHandler: () => void;
}

interface Props {
  children: JSX.Element;
}

const Context = React.createContext<ContextInterface>({
  start: false,
  startHandler: () => {},
});

export const ContextProvider = function (props: Props): JSX.Element {
  const [start, setStart] = useState<boolean>(false);

  const startHandler = function (): void {
    setStart(!start);
  };

  const contextValue: ContextInterface = {
    start,
    startHandler,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
