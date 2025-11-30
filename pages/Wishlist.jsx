import useSneakersContext from "../context/SneakersContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistData, wishlistLoading, wishlistError, wishlist } =
    useSneakersContext();
  console.log(wishlistData);
  console.log(wishlist);

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

  return (
    <div className="container p-3">
      <h1 className="lexend-exa m-3">Wishlisted</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {wishlist?.map((sneaker) => (
          <div key={sneaker._id}>
            <Link
              to={`/sneakerPage/${sneaker.sneakerId._id}`}
              className="text-decoration-none text-dark hover-text-primary"
            >
              <div className="col">
                <div className="card">
                  <img
                    src={sneaker.sneakerId.image1Url}
                    className="card-img-top"
                    alt="sneakerPhoto"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {sneaker.sneakerId.brand}
                      </small>
                    </p>
                    <h5 className="card-title">
                      {sneaker.sneakerId.sneakerName}
                    </h5>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {sneaker.sneakerId.colors}
                      </small>
                    </p>
                    <p className="card-text">₹{sneaker.sneakerId.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;
