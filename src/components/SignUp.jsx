import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState(""); // State to hold API error message
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError(""); // Clear previous error
      const response = await axios.post(
        "https://044b-111-94-111-60.ngrok-free.app/api/users/",
        data
      );
      console.log("User created:", response.data);
      navigate("/signin", { replace: true });
      // Handle successful response (e.g., redirect, success message)
    } catch (error) {
      console.error("There was an error creating the user:", error);
      setApiError(
        `An error occurred while creating your account: ${error.response?.data?.error}`
      ); // Set error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header text-center">
              <h4>Sign Up</h4>
            </div>
            <div className="card-body">
              {apiError && (
                <div className="alert alert-danger text-center">{apiError}</div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
