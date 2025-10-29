import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import Footer from "../components/footer"
import Navbar from "../components/navbar"

export default function Signin() {

  const navigate = useNavigate()
    const [signin,setSignin] = useState({
        name:"",
        email:"",
        password:"",
        phoneno:"",
        address:""
    })

    const [ errors,setErrors] = useState({
        name:"",
        email:"",
        password:"",
        phoneno:"",
        address:""
    })

    const detailset = function(eve){
       setSignin({...signin,[eve.target.name]:eve.target.value})
    }

   const validateForm = () => {
  const errors = {};

  const regex = {
    name: /^[A-Za-z\s]{3,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    phoneno: /^[6-9]\d{9}$/,
    address: /^[A-Za-z0-9\s,.-]{5,100}$/
  };

  
  if (!signin.name.trim()) {
    errors.name = "Name is required";
  } else if (!regex.name.test(signin.name)) {
    errors.name = "Name must be 3-30 letters only";
  }

  
  if (!signin.email.trim()) {
    errors.email = "Email is required";
  } else if (!regex.email.test(signin.email)) {
    errors.email = "Invalid email format";
  }

  
  if (!signin.phoneno.trim()) {
    errors.phoneno = "Phone number is required";
  } else if (!regex.phoneno.test(signin.phoneno)) {
    errors.phoneno = "Invalid phone number";
  }

 
  if (!signin.address.trim()) {
    errors.address = "Address is required";
  } else if (!regex.address.test(signin.address)) {
    errors.address = "Address must be 5-100 characters";
  }

  if (!signin.password.trim()) {
  errors.password = "Password is required";
} else if (!regex.password.test(signin.password)) {
  errors.password =
    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
}

  setErrors(errors);

 
  return Object.keys(errors).length === 0;
};


    const signup = function(eve){
        eve.preventDefault()
        
        if(!validateForm()){
          return
        }

         axios
      .post(import.meta.env.VITE_APP_API + "/signin", signin)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
        setTimeout(() => {
          navigate("/login");
        },1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
      setSignin({
    name:"",
        email:"",
        password:"",
        phoneno:"",
        address:""
  })
    }
  return (
   <>

   <Navbar/>
      <section className="container-fluid bg-light my-5 pt-5 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "90%" }}>
          <h2 className="text-center mb-3">Signin</h2>
          <hr className="mb-4" />
          <form onSubmit={signup} className="d-flex flex-column gap-3">
            <input
              type="text"
              name="name"
              onChange={detailset}
              value={signin.name}
              className="form-control input-animated"
              placeholder="Name"
              required
              autoComplete="username"
            />
            {errors.name && <p className="error text-danger h6">{errors.name}</p>}
            <input
              type="email"
              name="email"
              onChange={detailset}
              value={signin.email}
              className="form-control input-animated"
              placeholder="sample@gmail.com"
              required
              autoComplete="username"
            />
            {errors.email && <p className="error text-danger h6">{errors.email}</p>}
            <input
              type="password"
              name="password"
              onChange={detailset}
              value={signin.password}
              className="form-control input-animated"
              placeholder="password"
              required
              autoComplete="current-password"
            />
            {errors.password && <p className="error text-danger h6">{errors.password}</p>}
            <input
              type="number"
              name="phoneno"
              onChange={detailset}
              value={signin.phoneno}
              className="form-control input-animated"
              placeholder="Phone no"
              required
            />
            {errors.phoneno && <p className="error text-danger h6">{errors.phoneno}</p>}
            <textarea name='address'
              onChange={detailset}
              value={signin.address}
              className="form-control input-animated"
              placeholder="Madurai"
              required>

            </textarea>
            {errors.address && <p className="error text-danger h6">{errors.address}</p>}
            <button type="submit" className="btn btn-primary btn-animated py-2 fw-semibold">
              Submit
            </button>
            <Link to="/login" className='text-center text-decoration-none'>Already Have an Account ?</Link>
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

      <Footer/>
    </>
  )
}
