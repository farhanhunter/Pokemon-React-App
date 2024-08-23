import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
        "https://044b-111-94-111-60.ngrok-free.app/api/auth/login",
        data
      );
      console.log("User logged in:", response.data);
      // Handle successful response (e.g., store user info, redirect)
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("There was an error logging in:", error);
      setApiError(
        `An error occurred while logging in. ${error.response?.data?.error}`
      ); // Set error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              {apiError && (
                <div className="alert alert-danger text-center">{apiError}</div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
