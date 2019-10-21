import React from "react";

interface RightDrawerContextShape {
  drawerOpen: boolean;
  drawerWidth?: number;
  setDrawerOpen: (size?: number) => void;
}

const RightDrawerContext = React.createContext<RightDrawerContextShape>({
  drawerOpen: false,
  setDrawerOpen: _num => {}
});

export const RightDrawerContextProvider: React.FC = props => {
  const [drawerWidth, setDrawerSize] = React.useState<number>();

  const drawerOpen = !!drawerWidth;

  const setDrawerOpen = (size?: number) => {
    setDrawerSize(size);
  };

  return (
    <RightDrawerContext.Provider
      value={{ drawerOpen, drawerWidth, setDrawerOpen }}
    >
      {props.children}
    </RightDrawerContext.Provider>
  );
};

export const useRightDrawerContext = () => React.useContext(RightDrawerContext);
