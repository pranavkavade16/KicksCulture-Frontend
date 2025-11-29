import { useState } from "react";
const AddAddress = () => {
  const [formData, setFormData] = useState({
    pinCode: "",
    flatNumber: "",
    completeAddress: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    defaultAddress: false,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://kicks-culture-backend.vercel.app/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.log("Failed to add address.");
      }

      const data = await response.json();
      console.log("Address added successfully:", data);
    } catch (error) {
      console.log("Error adding the address", error);
    }
  };

  return (
    <div className="container p-3">
      <h1>Add New Address</h1>
      <br />
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="pinCode" className="form-label">
            Pin Code*
          </label>
          <input
            type="text"
            className="form-control"
            id="pinCode"
            placeholder="Eg: 110001"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label for="flatNumber" className="form-label">
            Flat/Building Number (Optional)
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
          <label for="completeAddress" className="form-label">
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
          <label for="firstName" className="form-label">
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
          <label for="lastName" className="form-label">
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
          <label for="mobileNumber" className="form-label">
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
        <input
          className="form-check-input"
          type="checkbox"
          checked={formData.defaultAddress}
          id="defaultAddress"
          onChange={handleChange}
        />
        <label className="form-check-label" for="defaultAddress">
          <p className="ms-2">Mark as my default address</p>
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
