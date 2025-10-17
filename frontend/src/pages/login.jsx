import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  });

  function adminset(eve) {
    setAdmin({ ...admin, [eve.target.name]: eve.target.value });
  }

  function login(eve) {
    eve.preventDefault();

    axios
      .post(import.meta.env.VITE_APP_API + "/login", admin)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("role", res.data.role);
        if(res.data.role === "admin"){
             setTimeout(() => {
            navigate("/admindashboard");
          },1500);
        }
        else{
            setTimeout(() => {
            navigate("/");
          },1500);
        }
        
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
      setAdmin({
    email: "",
    password: ""
  })
  }

  return (
    <>
      <section className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "90%" }}>
          <h2 className="text-center mb-3">Login</h2>
          <hr className="mb-4" />
          <form onSubmit={login} className="d-flex flex-column gap-3">
            <input
              type="email"
              name="email"
              onChange={adminset}
              value={admin.email}
              className="form-control input-animated"
              placeholder="sample@gmail.com"
              required
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              onChange={adminset}
              value={admin.password}
              className="form-control input-animated"
              placeholder="password"
              required
              autoComplete="current-password"
            />
            <button type="submit" className="btn btn-primary btn-animated py-2 fw-semibold">
              Submit
            </button>
            <Link to="/forgotpassword" className='text-center text-decoration-none'>Forgot Password</Link>
            <Link to="/signin" className='text-center text-decoration-none'>Don't Have an Account ? Signin</Link>
          </form>
        </div>
      </section>
      <ToastContainer />

      <style jsx>{`
        .input-animated {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .input-animated:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 8px rgba(13, 110, 253, 0.3);
          outline: none;
        }

        .btn-animated {
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .btn-animated:hover {
          background-color: #0b5ed7;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
