import React from "react";
import { RightDrawerContextProvider } from "./RightDrawerContext";
import { UserDataContextProvider } from "./UserDataContext";

const AllContextProviders: React.FC = props => {
  return (
    <RightDrawerContextProvider>
      <UserDataContextProvider>{props.children}</UserDataContextProvider>
    </RightDrawerContextProvider>
  );
};

export default AllContextProviders;
