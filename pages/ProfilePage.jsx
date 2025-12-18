import useFetch from "../customHooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const { data, loading, error } = useFetch(
    "https://kicks-culture-backend.vercel.app/profile"
  );
  const { data: addressData } = useFetch(
    "https://kicks-culture-backend.vercel.app/address"
  );
  console.log(addressData);

  const handleAddressDelete = async (addressId) => {
    try {
      const response = await fetch(
        `https://kicks-culture-backend.vercel.app/address/delete/${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Failed to delete the address.");
        return;
      }

      const data = await response.json();
      console.log("Address deleted successfully:", data);
    } catch (error) {
      console.log("Error in deleting the address.", error);
    }
  };

  if (loading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Error: {error}</p>
      </div>
    );
  if (!data)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-1">
          <img
            src="https://placehold.co/120x120"
            class="rounded-circle"
            alt=""
          />
        </div>
        <div className="col">
          <h2 className="m-4 ms-5">
            <span>{data[0].fristName} </span>
            <span> {data[0].lastName}</span>
          </h2>
        </div>
      </div>
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Overview
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              My Address
            </button>
            <button
              className="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              My Order
            </button>
            <button
              className="nav-link"
              id="nav-disabled-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-disabled"
              type="button"
              role="tab"
              aria-controls="nav-disabled"
              aria-selected="false"
            >
              Profile
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabindex="0"
          >
            <h4 className="mt-3">My Orders</h4>
            <div className="card mb-3" style={{ maxWidth: "" }}>
              <div className="row g-0">
                <div className="col-md-1">
                  <img
                    src="https://pdp.gokwik.co/kp-account/assets/icons/no-order-found.png"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">No past orders yet</h5>
                    <p className="card-text">
                      Start your first order to see it here.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        <Link to="/">Shop Now</Link>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h4>Saved Address</h4>
            <div className="row">
              {addressData?.map((address) => (
                <div className="col-3">
                  <div className="m-3">
                    <div
                      className="card"
                      style={{ width: "17rem", height: "16rem" }}
                    >
                      <div className="card-body">
                        <h4 className="card-title">
                          {address.firstName} {address.lastName}{" "}
                        </h4>

                        <p className="card-text">
                          {address.flatNumber}, {address.completeAddress}
                        </p>
                        <p className="card-text">{address.mobileNumber}</p>
                      </div>
                      <div className="card-footer p-0">
                        <div className="d-flex w-100">
                          <button
                            className="btn w-100 py-2 text-center fw-semibold text-danger rounded-0"
                            onClick={() => handleAddressDelete(address._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabindex="0"
          >
            <h4 className="mt-4">All Address</h4>
            <div className="row">
              <div className="col-3">
                <div className="m-3">
                  <a href="/addAddress">
                    <div
                      className="card"
                      style={{ width: "17rem", height: "16rem" }}
                    >
                      <div className="card-body">
                        <p
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "200px" }}
                        >
                          Add New
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {addressData?.map((address) => (
                <div className="col-3">
                  <div className="m-3">
                    <div
                      className="card"
                      style={{ width: "17rem", height: "16rem" }}
                    >
                      <div className="card-body">
                        <h4 className="card-title">
                          {address.firstName} {address.lastName}{" "}
                        </h4>

                        <p className="card-text">
                          {address.flatNumber}, {address.completeAddress}
                        </p>
                        <p className="card-text">{address.mobileNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
            tabindex="0"
          >
            <h4 className="mt-4">No past orders yet</h4>
          </div>
          <div
            className="tab-pane fade"
            id="nav-disabled"
            role="tabpanel"
            aria-labelledby="nav-disabled-tab"
            tabindex="0"
          >
            <h4 className="mt-4">Profile</h4>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-secondary btn-sm me-md-2"
                onClick={() => setEdit(!edit)}
              >
                Edit
              </button>
            </div>

            {edit ? (
              <div>
                {/* First Name */}
                <div className="d-flex align-items-start mb-4">
                  <i className="bi bi-person-vcard fs-4 me-3"></i>
                  <div className="flex-grow-1">
                    <label className="text-secondary mb-1">First Name</label>
                    <input
                      type="text"
                      className="form-control border-0 border-bottom"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="d-flex align-items-start mb-4">
                  <i className="bi bi-person-vcard fs-4 me-3"></i>
                  <div className="flex-grow-1">
                    <label className="text-secondary mb-1">Last Name</label>
                    <input
                      type="text"
                      className="form-control border-0 border-bottom"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="d-flex align-items-start mb-4">
                  <i className="bi bi-telephone fs-4 me-3"></i>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <label className="text-secondary mb-1 me-2">
                        Phone Number
                      </label>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip>Phone number cannot be edited</Tooltip>
                        }
                      >
                        <i className="bi bi-info-circle text-secondary"></i>
                      </OverlayTrigger>
                    </div>
                    <p className="fw-semibold border-bottom pb-1">
                      +919417683406
                    </p>
                  </div>
                </div>

                {/* Email ID */}
                <div className="d-flex align-items-start mb-4">
                  <i className="bi bi-envelope fs-4 me-3"></i>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <label className="text-secondary mb-1 me-2">
                        Email ID
                      </label>
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Email cannot be edited</Tooltip>}
                      >
                        <i className="bi bi-info-circle text-secondary"></i>
                      </OverlayTrigger>
                    </div>
                    <p className="fw-semibold border-bottom pb-1">
                      pranavkavade69739@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-person-vcard fs-4 me-3"></i>
                  <div>
                    <p className="text-secondary mb-0">First Name</p>
                    <p className="fw-semibold">Not provided</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-person-vcard fs-4 me-3"></i>
                  <div>
                    <p className="text-secondary mb-0">Last Name</p>
                    <p className="fw-semibold">Not provided</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-telephone fs-4 me-3"></i>
                  <div>
                    <p className="text-secondary mb-0">Phone Number</p>
                    <p className="fw-semibold">+919417683406</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-envelope fs-4 me-3"></i>
                  <div>
                    <p className="text-secondary mb-0">Email ID</p>
                    <p className="fw-semibold">johndoe@gmail.com</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
