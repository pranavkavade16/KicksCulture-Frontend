import { Link } from "react-router-dom";
import { useState } from "react";
import useSneakersContext from "../context/SneakersContext";
import * as bootstrap from "bootstrap";
const ProductList = ({ data, loading, error }) => {
  const [productSize, setProductSize] = useState();
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const { cart, setCart } = useSneakersContext();
  console.log(data);

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
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="container">
      <div className="m-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {data?.map((sneaker) => (
            <div key={sneaker._id}>
              <div className="col">
                <div className="card" style={{ height: "495px" }}>
                  <Link
                    to={`/sneakerPage/${sneaker._id}`}
                    className="text-decoration-none text-dark hover-text-primary"
                  >
                    <img
                      src={sneaker.image1Url}
                      className="card-img-top"
                      alt="sneakerPhoto"
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
                      <h5 className="card-title">{sneaker.sneakerName}</h5>
                    </Link>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {sneaker.colors}
                      </small>
                    </p>
                    <p className="card-text">₹{sneaker.price}</p>
                  </div>
                  <div className="card-footer p-0">
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

                      <button className="btn w-50 py-3 text-center fw-semibold text-primary rounded-0">
                        Wsishlist
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
                <div className="col">
                  <img
                    src={selectedSneaker?.image1Url}
                    alt="sneakerPhoto"
                    className="w-75"
                  />
                </div>
                <div className="col">
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
    </div>
  );
};

export default ProductList;
