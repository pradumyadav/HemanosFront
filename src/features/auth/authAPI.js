import axios from "axios";
import axiosInstance from "../API";

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userData, {});

      const data = response.data;
      localStorage.setItem("token", response.data.token);
      // TODO: on the server, it will return only some information of the user (not the password);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("loginInfo", loginInfo);
      const response = await axiosInstance.post("/auth/login", loginInfo);

      localStorage.setItem("token", response.data.token);
      resolve({ data: response.data });
      //  TODO: on the server, it will return only some information of the user (not password);
    } catch (error) {
      reject(error.response);
    }
  });
}

export function getUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get("/auth/get-user");
      const data = response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


