import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createInstructurAsync,
  getAllInstructorAsync,
  selectAllInstructor,
} from "./homeSlice";
import "./Home.css";
import { getUserAsync, selectLoggedInUser, selectUser } from "../auth/authSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const instructors = useSelector(selectAllInstructor);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [instructorData, setInstructorData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setInstructorData({
      ...instructorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(createInstructurAsync(instructorData));

    // Clear input fields after submitting the instructor
    setInstructorData({
      name: "",
      email: "", 
    });

    // Close the form box
    setIsFormVisible(false);
  };

  useEffect(() => {
    dispatch(getAllInstructorAsync());
    dispatch(getUserAsync());
  }, []);

  return (
    <div className="container">
      <div>
        {user?.role === "admin" && (
          <button onClick={() => setIsFormVisible(!isFormVisible)}>
            Add Instructor
          </button>
        )}

        {isFormVisible && (
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={instructorData.name}
                placeholder="Name"
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={instructorData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </label>
            <br />

            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <h1>List of Instructors</h1>
      {instructors?.map((instructor, index) => (
        <div key={instructor?.id || index} className="instructor-card">
          <p className="instructor-name">{instructor?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
