import { useContext } from "react";
import DataContext from "./DataContext";

const useDataContext = () => {
  return useContext(DataContext);
};

export default useDataContext;
