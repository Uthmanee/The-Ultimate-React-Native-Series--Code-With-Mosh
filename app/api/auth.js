import client from "./client";

const signInEndpoint = "/auth";

const login = (email, password) =>
  client.post(signInEndpoint, { email, password });

export default { login };

// import { create } from "apisauce";

// const signInEndpoint =
//   "accounts:signInWithPassword?key=AIzaSyD65Gpied-ePG2cwFwgE52dLuHOIBTaBH0";

// const signUpEndpoint =
//   "accounts:signUp?key=AIzaSyD65Gpied-ePG2cwFwgE52dLuHOIBTaBH0";

// const authClient = create({
//   baseURL: "https://identitytoolkit.googleapis.com/v1",
// });

// const login = (email, password) =>
//   authClient.post(signInEndpoint, { email, password });

// const register = (userInfo) =>
//   authClient.post(signUpEndpoint, { ...userInfo, displayName: userInfo.name });
// export default {
//   login,
//   register,
// };
