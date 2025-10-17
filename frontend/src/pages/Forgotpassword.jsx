import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Forgotpassword() {
  const [admin, setAdmin] = useState("");

  const [waitmsg, setWaitmsg] = useState(false);

  function adminset(eve) {
    setAdmin(eve.target.value);
  }

  function login(eve) {
    eve.preventDefault();

    setWaitmsg(true);

    axios
      .post(import.meta.env.VITE_APP_API + "/forgotpassword", { email: admin })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setWaitmsg(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setAdmin("");
  }

  return (
    <>
      <section className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "400px", width: "90%" }}
        >
          <h2 className="text-center mb-3">Enter Email</h2>
          <hr className="mb-4" />
          <form onSubmit={login} className="d-flex flex-column gap-3">
            <input
              type="email"
              name="email"
              onChange={adminset}
              value={admin}
              className="form-control input-animated"
              placeholder="sample@gmail.com"
              required
              autoComplete="username"
            />
            {waitmsg && <p className="text-danger">Please Wait</p>}
            <button
              type="submit"
              className="btn btn-primary btn-animated py-2 fw-semibold"
            >
              Submit
            </button>
            <Link to="/login" className="text-center text-decoration-none">
              Back
            </Link>
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
