import axiosInstance from "../API";

export function getCourses() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get("/course/get-course");

      const data = response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function createCourse(courseData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post(
        "/course/create-course",
        courseData,
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