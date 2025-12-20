import useSneakersContext from "../context/SneakersContext";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

const Wishlist = () => {
  const [productSize, setProductSize] = useState();

  const [selectedSneaker, setSelectedSneaker] = useState(null);

  const {
    wishlistLoading,

    wishlistError,

    wishlist,
    setWishlist,

    cart,

    setCart,

    toastMessage,
    showToast,
  } = useSneakersContext();

  console.log(wishlist);

  const handleWishlist = async (sneaker) => {
    try {
      const exists = wishlist.find(
        (item) => item.sneakerId?._id === sneaker._id
      );

      let response;

      if (exists) {
        response = await fetch(
          `https://kicks-culture-backend.vercel.app/sneakers/wishlist/delete/${exists._id}`,

          { method: "DELETE" }
        );

        if (!response.ok)
          throw new Error("Failed to remove sneaker from wishlist.");

        await response.json();

        setWishlist((prev) => prev.filter((item) => item._id !== exists._id));

        console.log(" Sneaker removed from wishlist");
        showToast("Sneaker removed to wishlist!");
        return;
      }
    } catch (error) {
      console.log("Error in adding/removing the sneaker in wishlist", error);
    }
  };

  const handleCart = async () => {
    if (!productSize) {
      alert("Please select your size");

      return;
    }

    const exists = cart?.find(
      (sneaker) => sneaker.sneakerId?._id === selectedSneaker._id
    );

    if (exists) {
      alert("Sneaker already in cart");

      return;
    }

    try {
      const response = await fetch(
        "https://kicks-culture-backend.vercel.app/sneakers/cart",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: "69178123a154f88538f56d4e",

            sneakerId: selectedSneaker._id,

            quantity: 1,

            size: productSize,
          }),
        }
      );

      if (!response.ok) {
        throw "Failed to add sneaker.";
      }

      const data = await response.json();

      console.log("Added Sneaker", data);

      const newCartItem = {
        userId: "69178123a154f88538f56d4e",

        sneakerId: selectedSneaker,

        quantity: 1,

        size: productSize,
      };

      setCart((prev) => [...prev, newCartItem]);

      showToast("Sneaker added to cart!");
    } catch (error) {
      console.log(error);
    }
  };

  if (wishlistLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );

  if (wishlistError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Error: {wishlistError}</p>
      </div>
    );

  if (!wishlist)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Wishlist is empty.</p>
      </div>
    );

  return (
    <div className="container p-3">
      <h1 className="lexend-exa m-3">Wishlisted</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {wishlist?.map((sneaker) => (
          <div key={sneaker._id} className="mb-3">
            <div className="col">
              <div className="card h-100 d-flex flex-column">
                <Link
                  to={`/sneakerPage/${sneaker.sneakerId?._id}`}
                  className="text-decoration-none text-dark hover-text-primary"
                >
                  <img
                    src={sneaker.sneakerId?.image1Url}
                    className="card-img-top img-fluid"
                    alt="sneakerPhoto"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {sneaker.sneakerId?.brand}
                    </small>
                  </p>
                  <Link
                    to={`/sneakerPage/${sneaker.sneakerId?._id}`}
                    className="text-decoration-none text-dark hover-text-primary"
                  >
                    <h5
                      className="card-title"
                      style={{
                        minHeight: "48px",
                      }}
                    >
                      {sneaker.sneakerId?.sneakerName.slice(0, 35)}
                    </h5>
                  </Link>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {sneaker.sneakerId?.colors.slice(0, 30)}
                    </small>
                  </p>
                  <p className="card-text">₹{sneaker.sneakerId?.price}</p>
                  <span>
                    Rating: {sneaker.sneakerId?.rating}{" "}
                    <i className="bi bi-star-fill"></i>
                  </span>
                </div>
                <div className="card-footer p-0 mt-auto">
                  <div className="d-flex w-100">
                    <button
                      className="btn w-50 py-3 text-center fw-semibold text-danger rounded-0"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setSelectedSneaker(sneaker.sneakerId);

                        setProductSize(null);
                      }}
                    >
                      Add to cart
                    </button>
                    <button
                      className="btn w-50 py-3 text-center fw-semibold text-primary rounded-0"
                      onClick={() => {
                        handleWishlist(sneaker.sneakerId);
                        setSelectedSneaker(sneaker.sneakerId);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {selectedSneaker?.sneakerName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <img
                    src={selectedSneaker?.image1Url}
                    alt="sneakerPhoto"
                    className="w-75 img-fluid"
                  />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h6>{selectedSneaker?.sneakerName}</h6>
                  <p>MRP: {selectedSneaker?.price}</p>
                  <span>Select Size: </span> <br />
                  <div className="d-flex flex-wrap gap-1 me-1 mt-1">
                    {selectedSneaker?.sizeAvailable.map((size) => (
                      <div key={size}>
                        <input
                          type="radio"
                          className="btn-check"
                          name={`sizeOptions-${selectedSneaker?._id}`}
                          id={`size-${selectedSneaker?._id}-${size}`}
                          autoComplete="off"
                          value={size}
                          onChange={() => setProductSize(size)}
                        />
                        <label
                          className="btn btn-outline-dark btn-sm"
                          htmlFor={`size-${selectedSneaker?._id}-${size}`}
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
