import useSneakersContext from "../context/SneakersContext";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

const Wishlist = () => {
  const [productSize, setProductSize] = useState();
  const [toastMessage, setToastMessage] = useState("");
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  const {
    wishlistData,

    wishlistLoading,

    wishlistError,

    fetchWishlist,

    cart,

    setCart,

    setWishlistData,
  } = useSneakersContext();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const showToast = (message) => {
    setToastMessage(null);
    setTimeout(() => setToastMessage(message), 0);
  };

  const handleWishlist = async (sneaker) => {
    try {
      const exists = wishlistData.find(
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

        setWishlistData((prev) =>
          prev.filter((item) => item._id !== exists._id)
        );

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

      setTimeout(() => {
        const modalEl = document.getElementById("exampleModal");

        const modalInstance = bootstrap.Modal.getInstance(modalEl);

        if (modalInstance) {
          modalInstance.hide();
        }

        document

          .querySelectorAll(".modal-backdrop")

          .forEach((el) => el.remove());

        document.body.classList.remove("modal-open");

        document.body.style.overflow = "auto";

        document.body.style.paddingRight = "0";

        console.log("Sneaker added to cart successfully!");
      }, 200);
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

  if (!wishlistData)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );

  if (wishlistData.length === 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Wishlist is empty.</p>
      </div>
    );

  return (
    <div className="container p-3">
      <h1 className="lexend-exa m-3">Wishlisted</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {wishlistData?.map((sneaker) => (
          <div key={sneaker._id} className="mb-3">
            <div className="col">
              <div className="card" style={{ height: "580px" }}>
                <Link
                  to={`/sneakerPage/${sneaker.sneakerId?._id}`}
                  className="text-decoration-none text-dark hover-text-primary"
                >
                  <img
                    src={sneaker.sneakerId?.image1Url}
                    className="card-img-top img-fluid"
                    alt="sneakerPhoto"
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
                    <h5 className="card-title">
                      {sneaker.sneakerId?.sneakerName.slice(0, 35)}
                    </h5>
                  </Link>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {sneaker.sneakerId?.colors}
                    </small>
                  </p>
                  <p className="card-text">₹{sneaker.sneakerId?.price}</p>
                </div>
                <div className="card-footer p-0">
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
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {selectedSneaker?.sneakerName}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast title={selectedSneaker?.sneakerName} toastMessage={toastMessage} />
    </div>
  );
};

export default Wishlist;
