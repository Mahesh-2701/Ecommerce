import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-4 px-5">
      <p className="footer-text mb-0">
        © 2025 Company, Inc
      </p>

      <Link
        to="/"
        className="footer-logo text-decoration-none"
        aria-label="Company Logo"
      >
        <strong>Ecommerce</strong>
      </Link>

      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="footer-link nav-link px-2">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="footer-link nav-link px-2">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="footer-link nav-link px-2">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/order" className="footer-link nav-link px-2">
            Orders
          </Link>
        </li>
      </ul>

      <style>{`
        /* ===== Minimal Modern Footer ===== */
        .footer {
          background-color: #f8f9fa; /* light neutral */
          color: #6c757d; /* muted text */
          border-top: 1px solid #dee2e6;
          border-radius: 10px 10px 0 0;
        }

        .footer-text {
          font-size: 0.9rem;
        }

        .footer-logo {
          font-weight: 600;
          font-size: 1.1rem;
          color: #0d6efd;
          transition: color 0.3s ease;
        }
        .footer-logo:hover {
          color: #0a58ca;
        }

        .footer-link {
          font-size: 0.95rem;
          color: #495057;
          transition: color 0.3s ease;
          position: relative;
        }
        .footer-link:hover {
          color: #0d6efd;
        }

        /* subtle underline on hover */
        .footer-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background-color: #0d6efd;
          transition: width 0.3s;
          margin-top: 2px;
        }
        .footer-link:hover::after {
          width: 100%;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          .nav {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
