import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const clientId = process.env.REACT_APP_REDDIT_CLIENT_ID;
const clientSecret = process.env.REACT_APP_REDDIT_CLIENT_SECRET;
const authUrl = "https://www.reddit.com/api/v1/access_token";

let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

const getToken = async () => {
  const currentTime = Date.now() / 1000;

  if (accessToken && tokenExpiryTime && currentTime < tokenExpiryTime) {
    // Token is still valid
    return accessToken;
  }

  const res = await axios.post(
    authUrl,
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      auth: {
        username: clientId!,
        password: clientSecret!,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  accessToken = res.data.access_token;
  const expiresIn = res.data.expires_in;
  tokenExpiryTime = currentTime + expiresIn * 0.9;

  return accessToken;
};

const instance = axios.create({
  baseURL: "/api",
});

const refreshAuthLogic = async (failedRequest: any) => {
  accessToken = null;
  const token = await getToken();
  failedRequest.response.config.headers["Authorization"] = "Bearer " + token;
  return Promise.resolve();
};

createAuthRefreshInterceptor(instance, refreshAuthLogic);

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default instance;
