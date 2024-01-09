import axiosInstance from "../API";

export function getLecture() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.get("/lecture/get-lecture");
      const data = response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function createLecture(lectureData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post(
        "/lecture/create-lecture",
        lectureData,
        {}
      );
    
        const data = response.data;
        // TODO: on the server, it will return only some information of the user (not the password);
        console.log(response,'aaa');
        resolve({ data });
      
    } catch (error) {
      reject(error.response.data);
    }
  });
}
