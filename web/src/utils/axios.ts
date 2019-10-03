import axios from "axios";
import Auth from "@aws-amplify/auth";

const apiHost = process.env.REACT_APP_API_HOST || "";
const protocol = apiHost.includes("localhost") ? "http" : "https";
const baseURL = `${protocol}://${apiHost}/`;

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(async config => {
  const session = await Auth.currentSession();

  if (!session.isValid()) {
    document.location.replace(`/login?redirect=${document.location.href}`);
  }

  const idToken = session.getIdToken().getJwtToken();

  const authedConfig = {
    ...config,
    withCredentials: process.env.NODE_ENV !== "development"
  };

  authedConfig.headers = {
    ...config.headers,
    Authorization: idToken
  };

  return authedConfig;
});

export default axiosInstance;
