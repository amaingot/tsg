import RollbarType from "rollbar";
import { compose } from "redux";

type ComposeType = typeof compose;

declare global {
  interface Window {
    Rollbar: RollbarType;
    analytics?: SegmentAnalytics.AnalyticsJS;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: ComposeType;
  }
}
