import React, { useState } from "react";
import { useFormik } from "formik";


function CreateUser({ loggedIn, setLoggedIn }) {
  const [formErrors, setFormErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("https://arnhsmith.pythonanywhere.com/create_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error("Failed to create user.");
          }
        })
        .then((user) => {
          // Handle the successful response here, if needed

          setSuccessMessage(`User created: ${user}`);
          console.log("User created:", user);
          formik.resetForm();
          setFormErrors([]);
        })
        .catch((error) => {
          setFormErrors([error.message]);
        });
    },
  });

  return (
    <div>
      <p id="email-text">Sign up with an email address</p>
      <form onSubmit={formik.handleSubmit} className="create-account-form">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {/* Rest of your form */}
        {formErrors.length > 0 && (
          <p style={{ color: "red" }}>{formErrors.join(", ")}</p>
        )}
        <button id="button" type="submit">
          Add User
        </button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={formik.handleSubmit} className="form"></form>
      <div id="login-link-container">
        <p id="login-link-text">Already have an account?</p>
        <a id="login-link" href="https://aaronnewtech.github.io/speech-app/login">
          Login in
        </a>
      </div>
    </div>
  );
}

export default CreateUser;
