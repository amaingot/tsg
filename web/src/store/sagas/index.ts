import { all, fork } from "redux-saga/effects";

import jobSaga from "./jobSaga";
import customerSaga from "./customerSaga";
import appDataSaga from "./appDataSaga";
import dashboardSaga from "./dashboardSaga";

const rootSaga = function* root() {
  yield all([
    fork(jobSaga),
    fork(customerSaga),
    fork(appDataSaga),
    fork(dashboardSaga)
  ]);
};

export default rootSaga;
