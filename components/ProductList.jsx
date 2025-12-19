import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useSneakersContext from "../context/SneakersContext";
import * as bootstrap from "bootstrap";
import Toast from "./Toast";
const ProductList = ({ data, loading, error }) => {
  const [productSize, setProductSize] = useState();
  const [selectedSneaker, setSelectedSneaker] = useState(null);

  const {
    cart,
    setCart,
    wishlistData,
    setWishlistData,
    toastMessage,
    showToast,
  } = useSneakersContext();
  console.log(selectedSneaker);
  console.log(productSize);
  useEffect(() => {
    const handleModalHidden = () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    };
    const modalEl = document.getElementById("exampleModal");
    modalEl?.addEventListener("hidden.bs.modal", handleModalHidden);
    return () => {
      modalEl?.removeEventListener("hidden.bs.modal", handleModalHidden);
      handleModalHidden();
    };
  }, []);
  const closeModal = () => {
    const modalEl = document.getElementById("exampleModal");
    if (!modalEl || !window.bootstrap) return;
    const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();
  };
  const handleWishlist = async (sneaker) => {
    try {
      const exists = wishlistData.find(
        (sneaker) => sneaker.sneakerId?._id === sneaker._id
      );
      let response;
      if (exists) {
        alert("Sneaker already in wishlist");
        return;
      }
      response = await fetch(
        "https://kicks-culture-backend.vercel.app/sneakers/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "69178123a154f88538f56d4e",
            sneakerId: sneaker._id,
          }),
        }
      );
      if (!response.ok) {
        throw "Failed to add sneaker.";
      }
      const data = await response.json();
      console.log("Sneaker added to the wishlist", data);
      showToast("Sneaker added to wishlist!");
      const wishlistItem = {
        userId: "69178123a154f88538f56d4e",
        sneakerId: sneaker,
      };
      setWishlistData((prev) => [...prev, wishlistItem]);
      setWishlisted(true);
    } catch (error) {
      console.log("Error in adding the sneaker in wishlist", error);
    }
  };
  const handleCart = async () => {
    if (!productSize) {
      alert("Please select your size");
      return;
    }
    const exists = cart?.find(
      (sneaker) =>
        sneaker.sneakerId?._id === selectedSneaker._id &&
        sneaker?.size === productSize
    );
    if (exists) {
      setToastMessage("Sneaker already in cart!");
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

      closeModal();
      showToast("Sneaker added to cart!");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;
  return (
    <div className="">
      <div className="m-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g4">
          {data?.map((sneaker) => (
            <div key={sneaker._id} className="mt-4">
              <div className="col">
                <div className="card h-100  d-flex flex-column">
                  <Link
                    to={`/sneakerPage/${sneaker._id}`}
                    className="text-decoration-none text-dark hover-text-primary"
                  >
                    <img
                      src={sneaker.image1Url}
                      className="card-img-top img-fluid"
                      alt="sneakerPhoto"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {sneaker.brand}
                      </small>
                    </p>
                    <Link
                      to={`/sneakerPage/${sneaker._id}`}
                      className="text-decoration-none text-dark hover-text-primary"
                    >
                      <h5
                        className="card-title"
                        style={{
                          minHeight: "48px",
                        }}
                      >
                        {sneaker.sneakerName.slice(0, 35)}
                      </h5>
                    </Link>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {sneaker.colors.slice(0, 30)}
                      </small>
                    </p>
                    <p className="card-text">₹{sneaker.price}</p>
                    <span>
                      Rating: {sneaker.rating}{" "}
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
                          setSelectedSneaker(sneaker);
                          setProductSize(null);
                        }}
                      >
                        Add to cart
                      </button>
                      <button
                        className="btn w-50 py-3 text-center fw-semibold text-primary rounded-0"
                        onClick={() => {
                          handleWishlist(sneaker);
                          setSelectedSneaker(sneaker);
                        }}
                      >
                        {wishlistData.find(
                          (item) => item.sneakerId?._id === sneaker._id
                        )
                          ? "Wishlisted❤️"
                          : "Wishlist"}
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
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                          onChange={() => setProductSize(event.target.value)}
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
      <Toast title={selectedSneaker?.sneakerName} toastMessage={toastMessage} />
    </div>
  );
};
export default ProductList;
