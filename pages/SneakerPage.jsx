import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import useSneakersContext from "../context/SneakersContext";
import { useState, useEffect } from "react";
import Wishlist from "./Wishlist";
const SneakerPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [size, setSize] = useState();
  const {
    sneakersData,
    sneakersLoading,
    sneakersError,
    cart,
    setCart,
    wishlistData,
    setWishlist,
  } = useSneakersContext();

  const { sneakerId } = useParams();
  const allSneakerData = sneakersData?.find(
    (sneaker) => sneaker._id === sneakerId
  );

  useEffect(() => {
    if (wishlistData && allSneakerData) {
      const exists = wishlistData.some(
        (item) => item.sneakerId._id === allSneakerData._id
      );
      setIsWishlisted(exists);
    }
  }, [wishlistData, allSneakerData]);

  const handleWishlist = async () => {
    try {
      const exists = wishlistData.find(
        (sneaker) => sneaker.sneakerId._id === allSneakerData._id
      );
      let response;
      if (exists) {
        response = await fetch(
          `https://kicks-culture-backend.vercel.app/sneakers/wishlist/delete/${exists._id}`,
          {
            method: "DELETE",
          }
        );

        setIsWishlisted(!isWishlisted);

        if (!response.ok) {
          throw "Failed to remove sneaker.";
        }

        const data = await response.json();
        console.log("Sneaker removed from wishlist", data);

        setWishlist((prev) => prev.filter((item) => item._id !== exists._id));
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
            sneakerId: allSneakerData._id,
          }),
        }
      );
      if (!response.ok) {
        throw "Failed to add sneaker.";
      }
      const data = await response.json();
      console.log("Sneaker added to the wishlist", data);
      setWishlist((prev) => [...prev, allSneakerData]);

      setIsWishlisted(true);
    } catch (error) {
      console.log("Error in adding the sneaker in wishlist", error);
    }
  };

  const handleCart = async () => {
    if (!size) {
      alert("Please select your size");
    }
    const exists = cart.find(
      (sneaker) => sneaker.sneakerId._id === allSneakerData._id
    );
    if (!exists) {
      setCart((prev) => [...prev, allSneakerData]);
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
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Cart", cart);
  console.log("Size", size);

  console.log("wishlist", wishlistData);

  if (sneakersLoading) return <p>Loading...</p>;
  if (sneakersError) return <p>Error: {sneakersError}</p>;
  if (!sneakersData) return <p>No data available</p>;
  return (
    <>
      <div className="container p-3">
        <h1 className="lexend-exa">Sneaker</h1>
        <div className="row">
          <div className="col-8">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image1Url}
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image2Url}
                    alt=""
                  />
                </div>
                <div className="col-6 mt-4">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image3Url}
                    alt=""
                  />
                </div>
                <div className="col-6 mt-4">
                  <img
                    className="img-fluid"
                    src={allSneakerData.image4Url}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
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
                      borderColor: isWishlisted ? "red" : "black",
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
                    <p class="d-inline-flex gap-1 m-1">
                      <input
                        type="radio"
                        className="btn-check"
                        name="sizeOptions"
                        id={`size-${size}`}
                        autoComplete="off"
                        key={size}
                        value={size}
                        onChange={() => setSize(size)}
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
                  <div class="d-grid gap-2 mt-4">
                    <button
                      class="btn btn-dark p-3"
                      type="button"
                      onClick={handleCart}
                    >
                      Add to cart
                    </button>
                  </div>
                  <div class="d-grid gap-2 mt-4">
                    <h5 class="badge text-bg-secondary p-4">
                      <i class="bi bi-lightning-charge-fill"></i>
                      Free express delivery
                    </h5>
                  </div>
                  <div className="mt-3">
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button
                            class="accordion-button"
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
                          class="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            {allSneakerData.description}
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button
                            class="accordion-button collapsed"
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
                          class="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            All purchases are subject to delivery fees. <br />{" "}
                            <br />
                            Standard delivery 4–9 business days Orders are
                            processed and delivered Monday–Friday (excluding
                            public holidays) <br /> <br />
                            All KicksCulture members enjoy free returns.
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button
                            class="accordion-button collapsed"
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
                          class="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
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
          data={sneakersData.slice(0, 4)}
          loading={sneakersLoading}
          error={sneakersError}
        />
      </div>

      <div className="container mb-5">
        <h3 className="lexend-exa">FAQ</h3>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
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
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
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
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
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
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                In most cases, your order will be delivered to you in 4-5
                business days.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
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
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
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
    </>
  );
};
export default SneakerPage;
