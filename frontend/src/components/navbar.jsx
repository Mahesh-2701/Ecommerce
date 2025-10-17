import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  let isAuth = localStorage.getItem("token") && localStorage.getItem("role")  == "user"
  return (
    <div>
        <nav class="navbar fixed-top navbar-expand-lg rounded-bottom-5 shadow-lg bg-body-tertiary">
  <div class="container-fluid">
   
    <Link to="/" className="navbar-brand">
                Ecommerce
              </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto d-flex gap-2 align-items-center mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/" className='text-decoration-none'>Home</Link>
        </li>
        <li class="nav-item">
          <Link to="/products" className='text-decoration-none'>Products</Link>
        </li>
        

        { isAuth ? (
          <>
           <li class="nav-item">
          <Link to="/profile" className='text-decoration-none'>Profile</Link>
        </li>
          <li class="nav-item">
          <Link to="/order" className='text-decoration-none'>Orders</Link>
        </li>
           <li class="nav-item">
          <Link to="/cart" className='text-decoration-none'>Cart</Link>
        </li>
          <li class="nav-item">
          <Link to="/logout" className='btn btn-danger rounded-3'>Logout</Link>
        </li>
          </>
           
        ):(
          <>
           <li class="nav-item">
          <Link to="/login" className='btn btn-primary rounded-3'>Login</Link>
        </li>
        <li class="nav-item">
          <Link to="/signin" className='btn btn-outline-primary rounded-3'>Signin</Link>
        </li>
          </>
        )}
        
        
      </ul>
    </div>
  </div>
</nav>
<style>
{`

.navbar {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  padding: 0.8rem 1.5rem;
}

.navbar:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: #0d6efd !important;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
.navbar-brand:hover {
  transform: scale(1.05);
  color: #0056d2 !important;
}

.nav-item {
  position: relative;
  list-style: none;
}

.nav-item a {
  color: #333 !important;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 6px 10px;
  border-radius: 6px;
}

.nav-item a:hover {
  background-color: #0d6efd;
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(13, 110, 253, 0.3);
}


.btn {
  transition: all 0.3s ease;
}
.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.4);
}


@media (max-width: 991px) {
  .navbar {
    background: rgba(255, 255, 255, 0.95) !important;
  }
  .nav-item a {
    display: block;
    padding: 10px;
  }
}
`}
</style>

    </div>
  )
}
