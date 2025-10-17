import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchproducts = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_APP_API + "/employees", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch Products");
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <section class="hero-section py-5 text-center container-fluid">
          <div class="row py-lg-5 fade-in-up">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-bold display-5 text-gradient">Welcome to Our Store</h1>
              <p class="lead text-body-secondary">
                Explore our latest collection of premium products — carefully
                curated to match your lifestyle and elevate your everyday
                experiences.
              </p>
              <p>
                <Link to="/products" class="btn btn-primary btn-lg my-3 glow-btn">
                  View All Products
                </Link>
              </p>
            </div>
          </div>
        </section>

        <div class="album-section py-5 bg-body-tertiary">
          <div class="container">
            <h2 class="text-center mb-5 fw-semibold section-title fade-in-up">
              Featured Products
            </h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 fade-in">
              {products.slice(0, 3).map((val) => {
                return (
                  <div class="col">
                    <div class="card product-card h-100 shadow-sm border-0">
                      <img
                        src={import.meta.env.VITE_APP_API + "/" + val.image}
                        class="card-img-top product-img"
                        alt="..."
                        height={"200px"}
                      ></img>
                      <div class="card-body text-center">
                        <p class="fw-bold fs-5 mb-1">{val.product}</p>
                        <p class="card-text text-muted">{val.description}</p>
                        <div class="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-sm btn-outline-primary px-4 py-2 rounded-4 view-btn"
                            onClick={() =>
                              navigate("/productdetailview", {
                                state: { product: val._id },
                              })
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer></ToastContainer>
      <Footer />

      <style>
        {`

.hero-section {
  background: linear-gradient(135deg, #e3f2fd, #ffffff);
  border-radius: 0 0 60px 60px;
  animation: fadeSlide 1s ease-in-out;
}

.text-gradient {
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glow-btn {
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  border: none;
  box-shadow: 0 0 15px rgba(13, 110, 253, 0.4);
  transition: all 0.3s ease;
}
.glow-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 25px rgba(13, 110, 253, 0.6);
}


.section-title {
  color: #333;
  position: relative;
}
.section-title::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.product-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(13, 110, 253, 0.2);
}

.product-img {
  border-radius: 20px 20px 0 0;
  transition: all 0.5s ease;
  object-fit: cover;
}
.product-card:hover .product-img {
  transform: scale(1.05);
}

.view-btn {
  transition: all 0.3s ease;
}
.view-btn:hover {
  transform: translateY(-3px);
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  color: #fff;
  box-shadow: 0 0 10px rgba(13, 110, 253, 0.4);
}


@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  opacity: 0;
  animation: fadeSlide 1.2s ease forwards;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1.4s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (max-width: 768px) {
  .hero-section {
    border-radius: 0 0 40px 40px;
  }
  .section-title::after {
    width: 40px;
  }
}
        `}
      </style>
    </div>
  );
}
