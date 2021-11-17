import React, { useState } from "react";
import { SortBar } from "../models/SortBar";

interface Props {
  children: JSX.Element;
}

export interface ContextInterface {
  start: boolean;
  arrayBeingSorted: SortBar[];
  startHandler: () => void;
  setHandler: (arr: SortBar[]) => void;
}

const Context = React.createContext<ContextInterface>({
  start: false,
  arrayBeingSorted: [],
  startHandler: () => {},
  setHandler: (arr: SortBar[]) => {},
});

export const ContextProvider = function (props: Props): JSX.Element {
  const [start, setStart] = useState<boolean>(false);
  const [arrayBeingSorted, setArrayBeingSorted] = useState<SortBar[]>([]);
  const startHandler = function (): void {
    setStart(!start);
  };

  const setHandler = function (arr: SortBar[]): void {
    console.log(arr);
    setArrayBeingSorted(arr);
  };

  const contextValue: ContextInterface = {
    start,
    arrayBeingSorted,
    startHandler,
    setHandler,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
