import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [roles, setRoles] = useState();

  const submitHandler = async (data) => {
    try {
      if (roles === "65ccb8aa9a50ad86fbda41ae") {
        const res = await axios.post(
          "http://localhost:4000/users/user/login",
          data
        );
        if (res.status === 200) {
          console.log("Login success");
          console.log(res.data.data);
          localStorage.setItem("id", res.data.data._id);
          // window.location.pathname = "/user/dashboard"
          toast.success("😃 Logged In Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            window.location.pathname = "/user/dashboard";
          }, 1000);
        } else {
          alert("Error");
        }
      } else if (roles === "65ccb89d9a50ad86fbda41ac") {
        const res = await axios.post(
          "http://localhost:4000/serviceproviders/provider/login",
          data
        );
        if (res.status === 200) {
          console.log("Login Success");
          localStorage.setItem("id", res.data.data._id);
          // window.location.pathname = "/serviceprovider/dashboard"
          toast.success("😃 Logged In Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            window.location.pathname = "/serviceprovider/dashboard";
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("😣 Internal Error!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12"></div>
        </div>
      </div>
      <main className="main-content  mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")',
          }}
        >
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i
                              className="fa fa-facebook text-white text-lg"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i
                              className="fa fa-github text-white text-lg"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i
                              className="fa fa-google text-white text-lg"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form
                      role="form"
                      className="text-start"
                      onSubmit={handleSubmit(submitHandler)}
                    >
                      <div className="input-group input-group-outline my-3">
                        <input
                          type="email"
                          className="form-control"
                          onfocus="focused(this)"
                          onfocusout="defocused(this)"
                          placeholder="Email"
                          {...register("email")}
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <input
                          type="password"
                          className="form-control"
                          onfocus="focused(this)"
                          onfocusout="defocused(this)"
                          placeholder="Password"
                          {...register("password")}
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <select
                          className="form-control"
                          value={roles}
                          onChange={(e) => setRoles(e.target.value)}
                        >
                          <option>Select Role</option>
                          <option value="65ccb8aa9a50ad86fbda41ae">User</option>
                          <option value="65ccb89d9a50ad86fbda41ac">
                            ServiceProvider
                          </option>
                        </select>
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label mb-0 ms-3"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                        <div className="ms-auto">
                          <Link
                            to="/forgotpassword"
                            className="text-sm forgot-password-link text-gray"
                            style={{ transition: "color 0.3s" }}
                            onMouseOver={(e) =>
                              (e.target.style.color = "#ff0084")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.color = "#6c757d")
                            }
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                      <div className="text-center">
                        <input
                          type="submit"
                          className="btn bg-gradient-primary w-100 my-4 mb-2"
                          value="Sign In"
                        ></input>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        Don't have an account?
                        <Link
                          to="/registration"
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign up
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
