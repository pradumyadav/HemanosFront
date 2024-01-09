// CourseForm.js
import React, { useEffect, useState } from "react";
import "./course.css";
import { createCourseAsync, getCourseAsync, selectAllCourses } from "./courseSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserAsync, selectLoggedInUser, selectUser } from "../auth/authSlice";

const Course = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();
  const courses = useSelector(selectAllCourses);
  const user = useSelector(selectUser);

  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const handleCourseChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourseAsync(courseData));

    // Clear input fields after submitting the course
    setCourseData({
      name: "",
      level: "",
      description: "",
      image: "",
    });
  };

  useEffect(() => {
    dispatch(getCourseAsync());
    dispatch(getUserAsync());
  }, []);

  return (
    <div className="mx-auto max-w-lg">
      {user?.role === 'admin' && (
        <button className="mx-auto max-w-lg" onClick={() => setIsFormVisible(!isFormVisible)}>
          Add Course
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleCourseSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={courseData.name}
              onChange={handleCourseChange}
            />
          </label>
          <br />

          <label>
            Level:
            <input
              type="text"
              name="level"
              placeholder="Level"
              value={courseData.level}
              onChange={handleCourseChange}
            />
          </label>
          <br />

          <label>
            Description:
            <textarea
              name="description"
              placeholder="Descri..."
              value={courseData.description}
              onChange={handleCourseChange}
            />
          </label>
          <br />

          <label>
            Image URL:
            <input
              type="text"
              name="image"
              placeholder="Image"
              value={courseData.image}
              onChange={handleCourseChange}
            />
          </label>
          <br />

          <button type="submit">Submit Course</button>
        </form>
      )}

      <div className="course-list-container">
        <h2 className="course-list-heading">Course List</h2>
        <table className="course-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <tr key={course.id} className="course-row">
                <td>{course.name}</td>
                <td>{course.level}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
