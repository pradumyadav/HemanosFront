import axiosInstance from "../API";

export function getAllInstructor() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Making an Instructor api call");
      const response = await axiosInstance.get("/instructor/get-allinstructor");

      const data = response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function createInstructor(instructorData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post(
        "/instructor/create-instructor",
        instructorData,
        {}
      );

      const data = response.data;
      // TODO: on the server, it will return only some information of the user (not the password);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}
