import { useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import useSneakersContext from "../context/SneakersContext";
const Checkout = () => {
  const [selectedId, setSelectedId] = useState("");
  const [order, setOrder] = useState();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const {
    data: cartData,

    loading: cartLoading,

    error: cartError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/cart");

  const { data: rawAddressData } = useFetch(
    "https://kicks-culture-backend.vercel.app/address"
  );

  const { cart, setCart } = useSneakersContext();

  const addressData = Array.isArray(rawAddressData)
    ? rawAddressData
    : Array.isArray(rawAddressData?.address)
    ? rawAddressData.address
    : [];

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setOrder(cartData);
    } else {
      setOrder([]);
    }
  }, [cartData]);
  console.log(order);

  const subTotal = Array.isArray(cartData)
    ? cartData?.reduce(
        (acc, curr) => acc + curr.sneakerId.price * curr.quantity,
        0
      )
    : 0;

  const handleEmptyCart = async () => {
    try {
      const response = await fetch(
        `https://kicks-culture-backend.vercel.app/sneakers/cart/empty/69178123a154f88538f56d4e`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw "Failed to empty the cart";
      }
      const updatedData = await response.json();
      setCart([]);
      console.log("updated Cart", cart);

      console.log("Deleted successfully:", updatedData);
    } catch (error) {
      console.log("Error in empting the cart", error);
    }
  };

  const handleOrder = async () => {
    try {
      if (!selectedId) {
        alert("Please select an address before placing the order.");
        return;
      }

      if (!Array.isArray(order) || order.length === 0) {
        alert("Cart is empty!!");
        return;
      }

      const payload = {
        userId: order[0].userId, // same for all items
        addressId: selectedId,
        totalPrice: subTotal,
        items: order.map((item) => ({
          sneakerId: item.sneakerId,
          quantity: item.quantity,
          size: item.size,
        })),
      };

      const response = await fetch(
        "https://kicks-culture-backend.vercel.app/sneakers/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      console.log(response);
      if (!response.ok) {
        const err = await response.text();
        console.error("Server response:", err);
        throw new Error("Error in placing the order.");
      }

      const placedOrder = await response.json();
      console.log("Order placed", placedOrder);

      console.log("Order placed successfully", placedOrder);

      handleEmptyCart();
      setOrderPlaced(!orderPlaced);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container py-3">
        {orderPlaced ? (
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <p className="text-dark fs-5 fw-semibold">Order Confirmed 🎉</p>
            <p className="text-muted text-center">
              We’ve received your order and it’s being processed.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="lexend-exa">Checkout</h1>
            <p className="mb-0 text-muted">
              ({cartData?.length} item) ₹{subTotal}
            </p>
            <div className="mt-3">
              <div className="row">
                <div className="col-12 col-lg-6 mt-3">
                  <h4>Select Address</h4>
                  <div className="row d-flex justify-content-center">
                    {addressData?.length === 0 ? (
                      <div className="col d-flex justify-content-center justify-content-sm-start">
                        <a href="/addAddress">
                          <div
                            className="card"
                            style={{ width: "300px", height: "255px" }}
                          >
                            <div className="card-body d-flex justify-content-center align-items-center">
                              Add New Address
                            </div>
                          </div>
                        </a>
                      </div>
                    ) : (
                      <div>
                        {addressData?.map((address) => {
                          const id = address._id;
                          const checked = selectedId === id;

                          return (
                            <div key={id} className="col">
                              <input
                                type="radio"
                                className="btn-check"
                                name={address}
                                id={`card-${id}`}
                                checked={selectedId === id}
                                value={id}
                                onChange={() => setSelectedId(id)}
                              />

                              <label
                                htmlFor={`card-${id}`}
                                className={`card h-100 m-3 ${
                                  checked ? "border-primary" : ""
                                }`}
                                style={{ cursor: "pointer" }}
                              >
                                <div className="card-body">
                                  <h5 className="card-title mb-2">
                                    {address.firstName} {address.lastName}
                                  </h5>
                                  <p className="card-text mb-1">
                                    {address.flatNumber},{" "}
                                    {address.completeAddress}
                                  </p>
                                  <p className="card-text mb-0">
                                    <small className="text-muted">
                                      Mobile: {address.mobileNumber}
                                    </small>
                                  </p>
                                </div>

                                <div
                                  className={`card-footer py-2 ${
                                    checked ? "bg-primary-subtle" : ""
                                  }`}
                                >
                                  <span
                                    className={
                                      checked
                                        ? "text-primary fw-semibold"
                                        : "text-muted"
                                    }
                                  >
                                    {checked ? "Selected" : "Click to select"}
                                  </span>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3">
                  <h4>Your Cart</h4>
                  <div>
                    {cartData?.map((sneaker) => (
                      <div
                        key={sneaker._id}
                        className="d-flex justify-content-between align-items-center mb-2 mt-3"
                      >
                        <div>
                          <p className="mb-1 fw-semibold">
                            {sneaker.sneakerId.sneakerName}
                          </p>
                          <p className="mb-0 text-muted">
                            {sneaker.quantity} item
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="mb-0 fw-semibold">
                            ₹ {sneaker.quantity * sneaker.sneakerId.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="d-flex justify-content-between">
                    <p>Subtotal</p>
                    <span className="justify-content-end fw-semibold">
                      ₹{subTotal}
                    </span>
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
                  <div className="d-grid gap-2 col-12 col-md-6 mx-auto">
                    <button
                      className="btn btn-dark p-3"
                      type="button"
                      onClick={handleOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Checkout;
