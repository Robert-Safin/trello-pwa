// useUpdateStore.ts

import { RootState } from "@/redux/Store";
import useReadStore from "./useStore";
import { useDispatch } from "react-redux";
import { RootAction } from "@/redux/RootActions";

 // Replace 'any' with the actual type of your payload

const useUpdateStore = () => {
  const store = useReadStore();
  const dispatch = useDispatch();

  const updateData = (newData: RootAction) => {
    dispatch({
      type: 'YOUR_ACTION_TYPE',
      payload: newData,
    });
  };

  return {
    store,
    updateData,
  };
};

export default useUpdateStore;
