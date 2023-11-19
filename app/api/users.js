import client from "./client";

const signUpEndpoint = "/users";

const register = (userInfo) => client.post(signUpEndpoint, userInfo);

export default { register };

// Firebase implementation
// check register function in Auth.js
