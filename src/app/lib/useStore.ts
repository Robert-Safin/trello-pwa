// useReadStore.ts

import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";

const useReadStore = () => {
  const store = useSelector<RootState>((state) => state);
  return store;
};

export default useReadStore as () => RootState;
