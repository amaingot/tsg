import { Dispatch } from "redux";
import {
  useSelector as unTypedUseSelector,
  useDispatch as unTypedUseDispatch
} from "react-redux";
import { AppState } from "./reducers";
import { AppActions, LOAD_ALL_DATA } from "./actions";
import { JobsState } from "./reducers/jobReducer";
import { CustomersState } from "./reducers/customerReducer";
import { useMemo } from "react";
import { LOAD_JOBS } from "./actions/jobActions";
import { LOAD_CUSTOMERS } from "./actions/customerActions";
import { DashboardState } from "./reducers/dashboardReducer";

export const useSelector = <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => unTypedUseSelector<AppState, TSelected>(selector, equalityFn);

export const useDispatch = () => unTypedUseDispatch<Dispatch<AppActions>>();

export const useJobs = () => useSelector<JobsState>(s => s.jobs);

export const useCustomers = () => useSelector<CustomersState>(s => s.customers);

export const useDashboard = () => useSelector<DashboardState>(s => s.dashboard);

export const useLoadJobs = () => {
  const dispatch = useDispatch();
  return useMemo(() => () => dispatch({ type: LOAD_JOBS }), [dispatch]);
};

export const useParsedJobsByMonth = () => {
  const { byMonth } = useDashboard();
  return useMemo(() => {
    let parsed: Array<{ month: string; count: number }> = [];
    Object.keys(byMonth).forEach(k => {
      parsed.push({ ...byMonth[k] });
    });
    return parsed;
  }, [byMonth]);
};

export const useLoadCustomers = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => () =>
      dispatch({
        type: LOAD_CUSTOMERS
      }),
    [dispatch]
  );
};

export const useLoadAppData = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => () =>
      dispatch({
        type: LOAD_ALL_DATA
      }),
    [dispatch]
  );
};
