import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSneakersContext from "../context/SneakersContext";
import Toast from "../components/Toast";

const AddAddress = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pinCode: "",
    flatNumber: "",
    completeAddress: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    defaultAddress: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setAddress, showToast, toastMessage } = useSneakersContext();

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddAddress = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const { pinCode, completeAddress, firstName, lastName, mobileNumber } =
        formData;

      if (
        !pinCode ||
        !completeAddress ||
        !firstName ||
        !lastName ||
        !mobileNumber
      ) {
        showToast("Please fill all the required fields.");
        setIsSubmitting(false);
        return;
      }

      const payload = { ...formData };

      const res = await fetch(
        "https://kicks-culture-backend.vercel.app/address"
      );
      const latestAddress = await res.json();

      const addressList = Array.isArray(latestAddress) ? latestAddress : [];

      const exists = addressList.some(
        (item) =>
          item.pinCode === payload.pinCode &&
          item.flatNumber === payload.flatNumber &&
          item.completeAddress === payload.completeAddress &&
          item.firstName === payload.firstName &&
          item.lastName === payload.lastName &&
          item.mobileNumber === payload.mobileNumber
      );

      if (exists) {
        showToast("This address already exists.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        "https://kicks-culture-backend.vercel.app/address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const addedAddress = await response.json();

      setAddress((prev) => [...prev, addedAddress]);
      showToast("Address added successfully!");

      setTimeout(() => {
        navigate("/profilePage");
      }, 2500);
    } catch (error) {
      console.error("Error adding the address:", error);
      showToast("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container p-3">
      <h1>Add New Address</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="pinCode" className="form-label">
            Pin Code*
          </label>
          <input
            type="text"
            className="form-control"
            id="pinCode"
            placeholder="Eg: 110001"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="flatNumber" className="form-label">
            Flat / Building Number (Optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="flatNumber"
            placeholder="Eg: A1, Block D"
            value={formData.flatNumber}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="completeAddress" className="form-label">
            Complete Address*
          </label>
          <input
            type="text"
            className="form-control"
            id="completeAddress"
            placeholder="Eg: Plot No: 10"
            value={formData.completeAddress}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name*
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Eg: Joe"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name*
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Eg: Harrison"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number*
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            placeholder="Eg: 9876543211"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultAddress"
            checked={formData.defaultAddress}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="defaultAddress">
            Mark as my default address
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          onClick={handleAddAddress}
        >
          {isSubmitting ? "Saving..." : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
