import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookServiceImage.css";

const BookService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const searchService = async (e) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/services/servicefilter",
        {
          params: {
            serviceName: e.target.value,
          },
        }
      );
      console.log("res in searchservice...", res.data.data);
      setServices(res.data.data);
    } catch (error) {
      setServices([]);
      console.log("Error.....", error.message);
    }
  };

  const displayService = async () => {
    try {
      const res = await axios.get("http://localhost:4000/services/service");
      if (res.status === 200) {
        console.log("Success");
        console.log(res.data.data);
        setServices(res.data.data);
      } else {
        console.log("error");
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
    }
  };

  useEffect(() => {
    displayService();
  }, []);

  return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div
                className="input-group mb-3 m-3 rounded border shadow-sm"
                style={{
                  background: "linear-gradient(to right, #f0f0f0, #e0e0e0)",
                }}
              >
                <input
                  type="text"
                  className="form-control input-text rounded"
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  placeholder="Search services..."
                  aria-label="Search services"
                  onChange={(e) => {
                    searchService(e);
                  }}
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text border-0 bg-transparent rounded-right"
                    style={{ backgroundColor: "#007bff", color: "#ffffff" }}
                  >
                    <i
                      className="fa fa-search"
                      style={{ paddingRight: "10px" }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <h1 className="text-center mb-4">Book a Service</h1>
          <div className="row">
            {services.map((service) => (
              <div key={service._id} className="col-md-4 mb-4">
                <div
                  className="card h-100 border rounded shadow-sm"
                  style={{ position: "relative" }}
                >
                  <img
                    src={service.imageURL}
                    className="card-img-top rounded-top"
                    alt={`Service ${service._id}`}
                    loading="lazy"
                    style={{ maxHeight: "300px", objectFit: "cover" }} // Added styling for the image
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service?.serviceName}</h5>
                    <p className="card-text">{service?.fees}</p>
                    <button className="btn btn-primary btn-block">
                      <Link
                        to={`/user/fetchdetails/${service._id}`}
                        className="text-white"
                      >
                        BOOK NOW
                      </Link>
                    </button>
                  </div>
                  <style>
                    {`
              .card:hover {
                transform: translateY(-5px);
                transition: transform 0.3s ease;
                background-color: #f8f9fa;
              }
            `}
                  </style>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
  );
};

export default BookService;
