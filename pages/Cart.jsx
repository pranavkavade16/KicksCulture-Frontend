import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Toast from "../components/Toast";
import { useEffect, useState } from "react";
import useSneakersContext from "../context/SneakersContext";

const Cart = () => {
  const [toastMessage, setToastMessage] = useState("");
  const { cart, setCart } = useSneakersContext();

  const {
    data: cartData,

    loading: cartLoading,

    error: cartError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/cart");

  console.log(cartData);

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setCart(cartData);
    } else {
      setCart([]);
    }
  }, [cartData]);

  const handleAddition = async (cartItemId) => {
    const exists = cart.find((sneaker) => sneaker._id === cartItemId);

    if (exists) {
      try {
        const response = await fetch(
          `https://kicks-culture-backend.vercel.app/sneakers/cart/${exists._id}`,

          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              quantity: exists.quantity + 1,
            }),
          }
        );

        if (!response.ok) {
          throw "Failed to add sneaker.";
        }

        const updatedData = await response.json();

        setCart((prevvalue) =>
          prevvalue.map((item) =>
            item._id === updatedData._id ? updatedData : item
          )
        );

        console.log("Cart Updated", updatedData);

        console.log(updatedData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubstraction = async (cartItemId) => {
    try {
      const sneaker = cart.find((item) => item._id === cartItemId);

      const response = await fetch(
        `https://kicks-culture-backend.vercel.app/sneakers/cart/decrement/${sneaker._id}`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ quantity: sneaker.quantity }),
        }
      );

      if (!response.ok) {
        throw "Failed to update the data.";
      }

      const updatedData = await response.json();

      setCart((prevValue) =>
        prevValue.map((item) =>
          item._id === updatedData._id ? updatedData : item
        )
      );
    } catch (error) {
      console.log("Error in delete the sneaker.", error);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      const response = await fetch(
        `https://kicks-culture-backend.vercel.app/sneakers/cart/delete/${cartItemId}`,

        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw "Failed to update sneaker.";
      }

      const updatedData = await response.json();

      setCart((prevvalue) =>
        prevvalue.filter((item) => item._id !== cartItemId)
      );

      console.log("Deleted successfully:", updatedData);
      setToastMessage("Sneaker removed from the cart.");
    } catch (error) {
      console.log("Error in delete the sneaker.");
    }
  };

  const handleWishlist = async (sneakerId, cartItemId) => {
    try {
      const response = await fetch(
        "https://kicks-culture-backend.vercel.app/sneakers/wishlist",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: "69178123a154f88538f56d4e",

            sneakerId: sneakerId,
          }),
        }
      );

      if (!response.ok) {
        throw "Failed to add sneaker.";
      }

      const data = await response.json();

      console.log("Sneaker added to the wishlist", data);

      if (data?.message === "Sneaker added to the wishlist successfully.") {
        console.log("Added to wishlist → deleting from cart...");

        await handleDelete(cartItemId);
        setToastMessage("Sneaker added to the wishlist successfully.");
        return;
      }

      if (data?.message === "Sneaker already in wishlist.") {
        console.log("Sneaker already in wishlist → deleting from cart...");

        await handleDelete(cartItemId);

        return;
      }
    } catch (error) {
      console.log("Error in adding the sneaker in wishlist", error);
    }
  };

  console.log("Cart", cart);

  if (cartLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );

  if (cartError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Error: {cartError}</p>
      </div>
    );

  if (!cartData || cartData?.length === 0 || !cart || cart?.length === 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Cart is empty.</p>
      </div>
    );

  const subTotal = Array.isArray(cart)
    ? cart.reduce((acc, curr) => acc + curr.sneakerId.price * curr.quantity, 0)
    : 0;

  return (
    <div className="container">
      <h1>Bag</h1>
      <div className="row">
        <div className="col-12 col-lg-7">
          {cart?.map((sneaker) => (
            <div key={sneaker._id}>
              <div className="card mb-3 w-100" style={{ width: "800px" }}>
                <div className="row g-0">
                  <div className="col-12 col-md-4">
                    <img
                      src={sneaker.sneakerId.image1Url}
                      className="img-fluid rounded-start w-100"
                      alt="sneakerPhoto"
                      style={{ cursor: "pointer", objectFit: "cover" }}
                      onClick={() =>
                        (window.location.href = `/sneakerPage/${sneaker.sneakerId._id}`)
                      }
                    />
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="card-body">
                      <span>{sneaker.sneakerId.brand}</span>
                      <h5
                        className="card-title"
                        onClick={() =>
                          (window.location.href = `/sneakerPage/${sneaker.sneakerId._id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {sneaker.sneakerId.sneakerName}
                      </h5>
                      <div>
                        <span className="text-body-secondary">
                          Size: {sneaker.size} UK
                        </span>
                      </div>
                      <p>MRP: ₹{sneaker.sneakerId.price}</p>
                      <div className="mt-4">
                        <div class="btn-group border rounded-pill px-3 py-2">
                          <button
                            type="button"
                            className="btn btn-sm p-0 border-0"
                            onClick={() =>
                              sneaker.quantity > 1
                                ? handleSubstraction(sneaker._id)
                                : handleDelete(sneaker._id)
                            }
                          >
                            {sneaker.quantity > 1 ? (
                              <i className="bi bi-dash"></i>
                            ) : (
                              <i className="bi bi-trash"></i>
                            )}
                          </button>
                          <span className="mx-3">{sneaker.quantity}</span>
                          <button
                            type="button"
                            className="btn btn-sm p-0 border-0"
                            onClick={() => handleAddition(sneaker._id)}
                          >
                            <i className="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn border rounded-pill px-3 py-2 d-flex align-items-center justify-content-center mt-3"
                          onClick={() =>
                            handleWishlist(sneaker.sneakerId._id, sneaker._id)
                          }
                        >
                          <span>Move to wishlist</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="col">
          <h3 className="mb-4">Order Summary</h3>
          <div>
            {cart?.map((sneaker) => (
              <div
                key={sneaker._id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <div>
                  <p className="mb-1 fw-semibold">
                    {sneaker.sneakerId.sneakerName}
                  </p>
                  <p className="mb-0 text-muted">{sneaker.quantity} item</p>
                </div>
                <div className="text-end">
                  <p className="mb-0 fw-semibold">
                    ₹ {sneaker.quantity * sneaker.sneakerId.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <p>Subtotal</p>
            <span className="justify-content-end fw-semibold">₹{subTotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <p>Estimated Delivery & Handling</p>
            <span className="justify-content-end">₹999</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-0">Total</p>
            <span className="justify-content-end fw-semibold">
              ₹{subTotal + 999}
            </span>
          </div>
          <hr />
          <div className="d-grid gap-2 col-6 mx-auto mb-3">
            <Link
              to="/checkout"
              className="btn btn-dark p-3 text-decoration-none hover-text-primary text-light"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <Toast title="Sneaker" toastMessage={toastMessage} />
    </div>
  );
};

export default Cart;
