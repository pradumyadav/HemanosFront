// LectureForm.js
import React, { useEffect, useState } from "react";
import "./Lecture.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { selectAllCourses } from "../course/courseSlice";
import { selectAllInstructor } from "../Home/homeSlice";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import {
  createLectureAsync,
  getLectureAsync,
  selectAllLecture,
  selectLectureError,
  clearError,
} from "./lectureSlice";
import {
  getUserAsync,
  selectUser,
} from "../auth/authSlice";

const Lecture = () => {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const user = useSelector(selectUser);
  const lectures = useSelector(selectAllLecture);
  const lectureError = useSelector(selectLectureError);
  const [lectureData, setLectureData] = useState({
    title: "",
    date: "",
    description: "",
    course: "",
    instructor: "",
  });

  const courses = useSelector(selectAllCourses);
  const instructors = useSelector(selectAllInstructor);
  // const allLectures = useSelector(selectAllLecture);

  const handleInputChange = (e) => {
    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to submit the lecture data (lectureData) to the server or Redux store
    dispatch(createLectureAsync(lectureData));
    setTimeout(() => {
      dispatch(clearError());
    }, 3000);
  };

  const formatDateTime = (inputDate) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDateTime = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDateTime;
  };

  useEffect(() => {
    dispatch(getLectureAsync());
    dispatch(getUserAsync());
  }, []);

  return (
    <div className="lecture-form-container">
      {user?.role === "admin" && (
        <button
          class="mx-auto max-w-lg"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          Add Lecture
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="lecture-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={lectureData.title}
              placeholder="Title"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={lectureData.date}
              placeholder="Date"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Description:
            <textarea
              name="description"
              placeholder="Descri..."
              value={lectureData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Course:
            <select
              name="course"
              value={lectureData.course}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Course
              </option>
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Instructor:
            <select
              name="instructor"
              value={lectureData.instructor}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Instructor
              </option>
              {instructors?.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </label>
          <br />

          {lectureError && <p className="text-red-500">{lectureError.error}</p>}

          <button type="submit" className="submit-button">
            Create Lecture
          </button>
        </form>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Description</th>
              <th>Course</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {lectures?.map((lecture) => (
              <tr key={lecture._id}>
                <td>{lecture.title}</td>
                <td>{formatDateTime(lecture.date)}</td>
                <td>{lecture.description}</td>
                <td>{lecture.course.name}</td>
                <td>{lecture.instructor.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lecture;
