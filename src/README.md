# Home Component

This is a React component for managing instructors in an educational system. It allows administrators to add new instructors, and displays a list of existing instructors.

# CourseForm Component

The `CourseForm` component is a React-based module designed for educational applications. It facilitates the management of courses by allowing users with 'admin' roles to add new courses and view existing ones.

## Features

- Add Courses: Users can input course details such as name, level, description, and image to create new courses.

- Responsive Design: The component is designed to ensure a seamless experience across various devices.

# Auth API Functions

This module provides functions for user authentication using Axios and a specified API instance.

## Functions

### `createUser(userData)`

- Description: Creates a new user with the provided user data.
- Parameters: `userData` - User information including email, password, etc.
- Returns: A Promise that resolves with user data if successful.

### `loginUser(loginInfo)`

- Description: Logs in a user with the provided login information.
- Parameters: `loginInfo` - User credentials such as email and password.
- Returns: A Promise that resolves with user data if login is successful.

### `getUser()`

- Description: Retrieves user information for the authenticated user.
- Returns: A Promise that resolves with user data.

# Signup Component

The Signup component is a React-based module for user registration and account creation. It includes a form for users to provide their email address, password, and confirm password.

## Features

- User Registration: Users can input their email address, password, and confirm password to register for a new account.

- Responsive Design: The component is designed to provide a seamless experience across various devices.

- **Redirect on Authentication:**

# Login Component

The Login component is a React-based module for user authentication and login. It includes a form for users to provide their email address and password to sign in.

## Features

- User Authentication: Users can input their email address and password to sign in to their accounts.

- Responsive Design: The component is designed to provide a seamless experience across various devices.

- Password Recovery: Users can recover their password by clicking on the "Forgot password?" link.

- Redirect on Authentication: If a user is already authenticated, the component redirects them to the home page.

- Error Handling: The component displays authentication errors, if any, such as invalid credentials.

ux Store Configuration

The Redux store is configured using the `configureStore` function from `@reduxjs/toolkit`. This store manages the state for various features in the application.

## Features

1. Authentication (`auth`): Manages user authentication-related state, including user information and authentication errors.

2. Home (`home`): Handles state related to the home feature. The specific functionality may vary based on the application's requirements.

3. Course (`course`): Manages state related to courses, including creating new courses and fetching the course list.

4. Lecture (`lecture`): Handles state related to lectures, which may include functionalities like creating and managing lectures.

# LectureForm Component

The `LectureForm` component is designed for managing lectures in an educational application. It allows users with an 'admin' role to add new lectures and view existing ones.

## Features

- Add Lecture: Users with 'admin' role can input details such as title, date, description, course, and instructor to create new lectures.

- Responsive Design: The component is designed to ensure a seamless user experience across various devices.

- Role-based Access Control: Only users with the 'admin' role have access to and can utilize the add lecture functionality.