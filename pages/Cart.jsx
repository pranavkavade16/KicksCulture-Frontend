import useFetch from "../customHooks/useFetch";
import { useEffect, useState } from "react";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/cart");
  console.log(cartData);

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const subTotal =
    cart?.length > 0
      ? cart?.reduce(
          (acc, curr) => acc + curr.sneakerId.price * curr.quantity,
          0
        )
      : 0;

  const handleAddition = async (sneakerId) => {
    const exists = cart.find((sneaker) => sneaker.sneakerId._id === sneakerId);

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

  const handleSubstraction = async (sneakerId) => {
    try {
      const sneaker = cart.find((item) => item.sneakerId._id === sneakerId);

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

      console.log("Calling handleDelete()");
      await handleDelete(cartItemId);
      console.log("handleDelete() finished");
    } catch (error) {
      console.log("Error in adding the sneaker in wishlist", error);
    }
  };

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
  if (!Array.isArray(cartData) || cartData.length === 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Cart is empty.</p>
      </div>
    );

  return (
    <div className="container">
      <h1>Bag</h1>
      <div className="row">
        <div className="col">
          {cart?.map((sneaker) => (
            <div key={sneaker._id}>
              <div class="card mb-3" style={{ width: "800px" }}>
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={sneaker.sneakerId.image1Url}
                      class="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <span>{sneaker.sneakerId.brand}</span>
                      <h5 class="card-title">
                        {sneaker.sneakerId.sneakerName}
                      </h5>
                      <span class="text-body-secondary">
                        Size: {sneaker.size} UK
                      </span>
                      <p>MRP: ₹{sneaker.sneakerId.price}</p>
                      <div className="mt-4">
                        <div class="btn-group border rounded-pill px-3 py-2">
                          <button
                            type="button"
                            class="btn btn-sm p-0 border-0"
                            onClick={() =>
                              sneaker.quantity > 1
                                ? handleSubstraction(sneaker.sneakerId._id)
                                : handleDelete(sneaker._id)
                            }
                          >
                            {sneaker.quantity > 1 ? (
                              <i class="bi bi-dash"></i>
                            ) : (
                              <i class="bi bi-trash"></i>
                            )}
                          </button>
                          <span class="mx-3">{sneaker.quantity}</span>
                          <button
                            type="button"
                            class="btn btn-sm p-0 border-0"
                            onClick={() =>
                              handleAddition(sneaker.sneakerId._id)
                            }
                          >
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>

                        <button
                          type="button"
                          class="btn border rounded-pill px-3 py-2 d-flex align-items-center justify-content-center mt-3"
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
          <h3 className="mb-4">Summary</h3>
          <div class="d-flex justify-content-between">
            <p>Subtotal</p>
            <span class="justify-content-end">₹{subTotal}</span>
          </div>
          <div class="d-flex justify-content-between">
            <p>Estimated Delivery & Handling</p>
            <span class="justify-content-end">₹999</span>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <p className="mb-0">Total</p>
            <span class="justify-content-end">₹{subTotal + 999}</span>
          </div>
          <hr />
          <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-dark p-3" type="button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
