import { Link, useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import useSneakersContext from "../context/SneakersContext";
import Toast from "../components/Toast";
import { useState, useEffect, useMemo } from "react";
import * as bootstrap from "bootstrap";

const SneakerPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [size, setSize] = useState();

  const [addedToCart, setAddedToCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const {
    sneakersData,

    sneakersLoading,

    sneakersError,

    cart,

    setCart,

    wishlistData,

    fetchWishlist,

    setWishlistData,
    toastMessage,
    setToastMessage,
    showToast,
  } = useSneakersContext();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const { sneakerId } = useParams();

  const allSneakerData = sneakersData?.find(
    (sneaker) => sneaker._id === sneakerId
  );
  console.log("wishlist data", wishlistData);
  console.log("selected sneaker", allSneakerData);
  useEffect(() => {
    if (wishlistData && allSneakerData) {
      const exists = wishlistData.some(
        (item) => item.sneakerId?._id === allSneakerData._id
      );

      setIsWishlisted(exists);
    }
  }, [wishlistData, allSneakerData]);

  const handleWishlist = async () => {
    try {
      const exists = wishlistData.find(
        (item) => item.sneakerId?._id === allSneakerData._id
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

        setIsWishlisted(false);

        showToast("Sneaker removed from wishlist");

        console.log(" Sneaker removed from wishlist");

        return;
      }

      response = await fetch(
        "https://kicks-culture-backend.vercel.app/sneakers/wishlist",

        {
          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            userId: "69178123a154f88538f56d4e",

            sneakerId: allSneakerData._id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add sneaker to wishlist.");

      const data = await response.json();

      const rawItem = data.newSneaker || data.data;

      const normalizedItem = {
        ...rawItem,
        sneakerId: allSneakerData,
      };
      setWishlistData((prev) => [...prev, normalizedItem]);

      setIsWishlisted(true);

      showToast("Sneaker added to wishlist");

      console.log("Sneaker added to wishlist:", data);
    } catch (error) {
      console.error("Error handling wishlist:", error);
    }
  };

  const handleCart = async () => {
    if (!size) {
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
      return;
    }
    setShowAlert(false);

    const exists = cart.find(
      (sneaker) =>
        sneaker.sneakerId?._id === allSneakerData._id &&
        Number(sneaker.size) === size
    );

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

            sneakerId: allSneakerData._id,

            quantity: 1,

            size,
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

        sneakerId: allSneakerData,

        quantity: 1,

        size,
      };

      setCart((prev) => [...prev, newCartItem]);
      showToast("Sneaker added to the cart!");

      setAddedToCart(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomNumber1 = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const getRandomNumber2 = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  if (sneakersLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );

  if (sneakersError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Error: {sneakersError}</p>
      </div>
    );

  if (!sneakersData)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );

  return (
    <>
      <div className="container p-3">
        <h1 className="lexend-exa">Sneaker</h1>
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="container">
              <div className="row">
                <div className="col-6 col-sm-6">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image1Url}
                    alt="sneakerImage1"
                  />
                </div>
                <div className="col-6 col-sm-6">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image2Url}
                    alt="sneakerImage2"
                  />
                </div>
                <div className="col-6 col-sm-6 mt-4">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image3Url}
                    alt="sneakerImage3"
                  />
                </div>
                <div className="col-6 col-sm-6 mt-4">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image4Url}
                    alt="sneakerImage4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            <div className="container">
              <div className="row">
                <div className="col">
                  <i
                    className={
                      isWishlisted
                        ? "bi bi-heart-fill d-flex justify-content-end"
                        : "bi bi-heart d-flex justify-content-end"
                    }
                    onClick={handleWishlist}
                    style={{
                      color: isWishlisted ? "red" : "none",

                      borderColor: "black",

                      cursor: "pointer",
                    }}
                  ></i>
                  <span className="m-2">{allSneakerData.brand}</span>
                  <h2 className="oswald m-2">{allSneakerData.sneakerName}</h2>
                  <span className="fw-lighter mb-2 ms-2">
                    {allSneakerData.colors}
                  </span>
                  <br /> <br />
                  <h5 className="m-2">
                    ₹{allSneakerData.price}
                    {"   "}
                    <span className="fw-lighter mb-2 ms-2">
                      {" "}
                      MRP(Inclusive of all taxes)
                    </span>
                  </h5>
                  <p className="mt-4 ms-2">Shoes Size(UK)</p>
                  {allSneakerData.sizeAvailable.map((size) => (
                    <p className="d-inline-flex gap-1 m-1">
                      <input
                        type="radio"
                        className="btn-check"
                        name="sizeOptions"
                        id={`size-${size}`}
                        autoComplete="off"
                        key={size}
                        value={size}
                        onChange={() => setSize(event.target.value)}
                        required
                      />
                      <label
                        className="btn btn-outline-dark m-1"
                        htmlFor={`size-${size}`}
                        key={`label-${size}`}
                      >
                        {size}
                      </label>
                    </p>
                  ))}
                  <div className="mt-4">
                    {showAlert ? (
                      <div class="alert alert-warning" role="alert">
                        Please select size!
                      </div>
                    ) : null}
                    <button
                      className="btn btn-dark w-100 p-3"
                      type="button"
                      onClick={handleCart}
                      id="liveToastBtn"
                    >
                      {addedToCart ? (
                        <Link
                          to="/cart"
                          className="text-decoration-none hover-text-primary text-light"
                        >
                          Go to cart
                        </Link>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                  <div className="d-grid gap-2 mt-4">
                    <h5 className="badge text-bg-secondary p-4">
                      <i className="bi bi-lightning-charge-fill"></i>
                      Free express delivery
                    </h5>
                  </div>
                  <div className="mt-3">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            About Product
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            {allSneakerData.description}
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Delivery & Returns
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            All purchases are subject to delivery fees. <br />{" "}
                            <br />
                            Standard delivery 4–9 business days Orders are
                            processed and delivered Monday–Friday (excluding
                            public holidays) <br /> <br />
                            All KicksCulture members enjoy free returns.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Reviews {"        "}
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            {allSneakerData.rating} Stars
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-3">
        <h3 className="lexend-exa">You may also like</h3>
        <ProductList
          data={sneakersData.slice(5, 9)}
          loading={sneakersLoading}
          error={sneakersError}
        />
      </div>
      <div className="container mb-5">
        <h3 className="lexend-exa">FAQ</h3>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Why KicksCulture
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                KicksCulture is a leading premium lifestyle retailer in India
                and has partnered with great homegrown labels as well as
                globally renowned brands such as Nike, Adidas, New Balance,
                Asics, Puma and many more. Our goal is to bring the best of the
                world to you!
                <br /> <br />
                As a community-first collective, KicksCulture has been the
                choice of many brands to foray into the country. We love what we
                represent, curating events & drops that promote the culture
                while being detail-orientated & fresh with our approach.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                When will I receive my order?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                In most cases, your order will be delivered to you in 4-5
                business days.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Can I return or exchange my order?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                We offer exchanges and returns in cases of size mismatches or
                errors with your order. Please note, sale items are not eligible
                for return or exchange. In the rare event you receive an
                incorrect or defective product, our team will inspect the case
                and issue a gift card, credit, or exchange as needed. You can
                learn more about our return & exchange policy here.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast title={allSneakerData?.sneakerName} toastMessage={toastMessage} />
    </>
  );
};

export default SneakerPage;
