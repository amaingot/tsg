import axios from "axios";
import Auth from "@aws-amplify/auth";

export const ApiBaseURL =
  process.env.REACT_APP_API_HOST || `https://api.${document.location.host}/`;

const axiosInstance = axios.create({
  baseURL: ApiBaseURL
});

axiosInstance.interceptors.request.use(async config => {
  try {
    const session = await Auth.currentSession();

    if (!session.isValid()) {
      document.location.replace(`/login?redirect=${document.location.href}`);
      return config;
    }

    const idToken = session.getIdToken().getJwtToken();

    const authedConfig = {
      ...config
      // withCredentials: process.env.NODE_ENV !== "development"
    };

    authedConfig.headers = {
      ...config.headers,
      Authorization: idToken
    };

    return authedConfig;
  } catch (e) {
    window.Rollbar.warn(e);
    document.location.replace(`/login?redirect=${document.location.href}`);
  }

  return config;
});

export default axiosInstance;
