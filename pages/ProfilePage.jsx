import useFetch from "../customHooks/useFetch";

import { useEffect, useState, useMemo } from "react";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

import useSneakersContext from "../context/SneakersContext";

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    pinCode: "",
    flatNumber: "",
    completeAddress: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    defaultAddress: false,
  });
  const { address, setAddress, toastMessage, showToast } = useSneakersContext();
  const { data, loading, error } = useFetch(
    "https://kicks-culture-backend.vercel.app/profile"
  );

  const { data: addressData } = useFetch(
    "https://kicks-culture-backend.vercel.app/address"
  );

  const { data: orderData } = useFetch(
    "https://kicks-culture-backend.vercel.app/order"
  );

  useEffect(() => {
    if (Array.isArray(addressData)) {
      setAddress(addressData);
    } else {
      setAddress([]);
    }
  }, [addressData]);

  useEffect(() => {
    if (selectedAddress) {
      setFormData(selectedAddress);
    } else {
      setFormData({
        pinCode: "",
        flatNumber: "",
        completeAddress: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        defaultAddress: false,
      });
    }
  }, [selectedAddress]);

  console.log(orderData);
  const handleEdit = async (addressId) => {
    try {
      const payload = { ...formData };
      const response = await fetch(
        `https://kicks-culture-backend.vercel.app/address/edit/${addressId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        console.log("Failed to update the address.");
      }

      const updatedAddress = await response.json();
      console.log("Address updated successfully.", updatedAddress);
      setAddress((prevValue) =>
        prevValue.map((item) =>
          item._id === addressId ? updatedAddress.address : item
        )
      );
      setEdit(false);
    } catch (error) {
      console.log("Error in updating the address.", error);
    }
  };

  console.log(formData);

  const handleAddressDelete = async (addressId) => {
    try {
      const response = await fetch(
        `https://kicks-culture-backend.vercel.app/address/delete/${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw "Failed to delete the address";
      }

      const deletedAddress = await response.json();
      setAddress((prevValue) =>
        prevValue.filter((item) => item._id !== addressId)
      );
      console.log("Deleted successfully", deletedAddress);
      showToast("Address deleted.");
    } catch (error) {
      console.log("Error in deleting the address.");
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
      <div className="row align-items-center">
        <div className="col-3 col-md-1">
          <img
            src="https://placehold.co/120x120"
            class="rounded-circle"
            alt="profilePicture"
          />
        </div>
        <div className="col">
          <h2 className="ms-5">
            <span>{data[0].fristName} </span>
            <span> {data[0].lastName}</span>
          </h2>
        </div>
      </div>
      <div className="mt-4">
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
              My Profile
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
              My Orders
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
              My Address
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
            <h4 className="mt-4">Profile</h4>

            <div>
              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-person-vcard fs-4 me-3"></i>
                <div>
                  <p className="text-secondary mb-0">First Name</p>
                  <p className="fw-semibold">{data[0].fristName}</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-person-vcard fs-4 me-3"></i>
                <div>
                  <p className="text-secondary mb-0">Last Name</p>
                  <p className="fw-semibold">{data[0].lastName}</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-telephone fs-4 me-3"></i>
                <div>
                  <p className="text-secondary mb-0">Phone Number</p>
                  <p className="fw-semibold">{data[0].mobileNumber}</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-envelope fs-4 me-3"></i>
                <div>
                  <p className="text-secondary mb-0">Email ID</p>
                  <p className="fw-semibold">{data[0].email}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabindex="0"
          >
            <h4 className="mt-3 mb-3">My Orders</h4>
            {orderData?.length === 0 ? (
              <p>No previous orders</p>
            ) : (
              <div className="row">
                {orderData?.map((order, index) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                    key={order._id}
                  >
                    <div>
                      <div class="card w-100" style={{ height: "280px" }}>
                        <div class="card-body">
                          <h5 class="card-title">
                            Order #
                            {new Date(order.createdAt)
                              .getTime()
                              .toString()
                              .slice(-6)}
                          </h5>
                          <h6 class="card-subtitle mb-2 text-body-secondary">
                            Total Amount: {order.totalPrice + 999}
                          </h6>
                          <h6 class="card-subtitle mb-2 text-body-secondary">
                            Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </h6>
                          <p>Items: ({order.items.length})</p>
                          {order.items.slice(0, 3).map((item, index) => (
                            <div class="card-text" key={index}>
                              <p>{item.sneakerId.sneakerName}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
            tabindex="0"
          >
            {edit ? (
              <div>
                <div>
                  {/* Pin Code */}
                  <div className="d-flex flex-column flex-md-row align-items-md-start mb-4">
                    <i className="bi bi-geo-alt fs-4 me-md-3 mb-2 mb-md-0"></i>
                    <div className="flex-grow-1 w-100">
                      <label className="text-secondary mb-1">Pin Code*</label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        placeholder="Eg: 110001"
                        value={formData.pinCode}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            pinCode: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Flat / Building */}
                  <div className="d-flex flex-column flex-md-row align-items-md-start mb-4">
                    <i className="bi bi-house-door fs-4 me-md-3 mb-2 mb-md-0"></i>
                    <div className="flex-grow-1 w-100">
                      <label className="text-secondary mb-1">
                        Flat / Building Number (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        placeholder="Eg: A1, Block D"
                        value={formData.flatNumber}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            flatNumber: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Complete Address */}
                  <div className="d-flex flex-column flex-md-row align-items-md-start mb-4">
                    <i className="bi bi-map fs-4 me-md-3 mb-2 mb-md-0"></i>
                    <div className="flex-grow-1 w-100">
                      <label className="text-secondary mb-1">
                        Complete Address*
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        placeholder="Eg: Plot No: 10"
                        value={formData.completeAddress}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            completeAddress: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="d-flex flex-column flex-md-row align-items-md-start mb-4">
                    <i className="bi bi-person fs-4 me-md-3 mb-2 mb-md-0"></i>
                    <div className="flex-grow-1 w-100">
                      <label className="text-secondary mb-1">First Name*</label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        placeholder="Eg: Joe"
                        value={formData.firstName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            firstName: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="d-flex flex-column flex-md-row align-items-md-start mb-4">
                    <i className="bi bi-person fs-4 me-md-3 mb-2 mb-md-0"></i>
                    <div className="flex-grow-1 w-100">
                      <label className="text-secondary mb-1">Last Name*</label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        placeholder="Eg: Harrison"
                        value={formData.lastName}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            lastName: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="d-flex flex-column flex-md-row align-items-md-start mb-4">
                    <i className="bi bi-telephone fs-4 me-md-3 mb-2 mb-md-0"></i>
                    <div className="flex-grow-1 w-100">
                      <label className="text-secondary mb-1">
                        Mobile Number*
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0"
                        placeholder="Eg: 9876543211"
                        value={formData.mobileNumber}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            mobileNumber: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Link
                    to="/profilePage"
                    className="btn btn-primary text-decoration-none hover-text-primary text-light"
                    onClick={() => {
                      handleEdit(selectedAddress._id);
                    }}
                  >
                    Save Edits
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="mt-4">All Address</h4>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <div className="m-1">
                      <a href="/addAddress">
                        <div
                          className="card w-100"
                          style={{ width: "300px", height: "255px" }}
                        >
                          <div className="card-body d-flex justify-content-center align-items-center">
                            Add New
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {address?.map((address) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2"
                      key={address._id}
                    >
                      <div className="m-1">
                        <div
                          className="card w-100"
                          style={{ width: "300px", height: "255px" }}
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
                                className="btn w-50 py-2 text-center fw-semibold text-danger rounded-0"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setSelectedAddress(address);
                                  setEdit(true);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn w-50 py-2 text-center fw-semibold text-primary rounded-0"
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
            )}
          </div>
        </div>
      </div>
      <Toast title="Notification" toastMessage={toastMessage} />
    </div>
  );
};

export default ProfilePage;
