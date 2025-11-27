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

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  console.log(formData);

  return (
    <div className="container p-3">
      <h1>Add New Address</h1>
      <br />
      <form action="" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="pinCode" class="form-label">
            Pin Code*
          </label>
          <input
            type="text"
            class="form-control"
            id="pinCode"
            placeholder="Eg: 110001"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-3">
          <label for="flatNumber" class="form-label">
            Flat/Building Number (Optional)
          </label>
          <input
            type="text"
            class="form-control"
            id="flatNumber"
            placeholder="Eg: A1, Block D"
            value={formData.flatNumber}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="completeAddress" class="form-label">
            Complete Address*
          </label>
          <input
            type="text"
            class="form-control"
            id="completeAddress"
            placeholder="Eg: Plot No: 10"
            value={formData.completeAddress}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label">
            First Name*
          </label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            placeholder="Eg: Joe"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">
            Last Name*
          </label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            placeholder="Eg: Harrison"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="mobileNumber" class="form-label">
            Mobile Number*
          </label>
          <input
            type="text"
            class="form-control"
            id="mobileNumber"
            placeholder="Eg: 9876543211"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <input
          class="form-check-input"
          type="checkbox"
          checked={formData.defaultAddress}
          id="defaultAddress"
          onChange={handleChange}
        />
        <label class="form-check-label" for="defaultAddress">
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
