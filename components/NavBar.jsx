import { NavLink } from "react-router-dom";
import Search from "./Search";
import useSneakersContext from "../context/SneakersContext";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { cartData = [], wishlistData = [] } = useSneakersContext();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (cartData || wishlistData) {
      setCart(cartData);
      setWishlist(wishlistData);
    }
  }, [cartData, wishlistData]);

  return (
    <header className="bg-dark text-light">
      <div className=" mx-auto container-fluid d-none d-lg-block">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <a class="navbar-brand brandname" href="/" style={{ color: "red" }}>
              <h3 className="text-center mt-3">KicksCulture</h3>
            </a>
            <nav className="mx-auto p-2">
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/newArrival"
                    style={{ color: "white" }}
                  >
                    New Arrival
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/allSneakers"
                    style={{ color: "white" }}
                  >
                    Sneakers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/cart"
                    style={{ color: "white" }}
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    style={{ color: "white" }}
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <h4 className="m-3 ms-3">
              <i
                className="bi bi-search"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <Search />
              </i>
            </h4>
            <h4 className="m-3 ms-2">
              <NavLink to="/wishlist" style={{ color: "white" }}>
                <i className="bi bi-bag-heart"></i>
              </NavLink>
              {wishlist?.length > 0 ? (
                <span
                  className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem", padding: "0.2em 0.4em" }}
                >
                  {wishlist?.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              ) : null}
            </h4>
            <h4 className="m-3 ms-2">
              <NavLink to="/profilePage" style={{ color: "white" }}>
                <i className="bi bi-person-circle"></i>
              </NavLink>
            </h4>
            <h4 className="m-3 ms-2">
              <NavLink to="/cart" style={{ color: "white" }}>
                <i className="bi bi-cart"> </i>
              </NavLink>
              {cart?.length > 0 ? (
                <span
                  className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem", padding: "0.2em 0.4em" }}
                >
                  {cart?.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              ) : null}
            </h4>
          </div>
        </div>
      </div>
      // navbar for mobile
      <nav className="navbar navbar-dark bg-dark d-lg-none px-3">
        <NavLink
          className="navbar-brand fw-bold"
          to="/"
          style={{ color: "red" }}
        >
          KicksCulture
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mt-3" id="mobileNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/newArrival">
                New Arrival
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/allSneakers">
                Sneakers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/cart">
                Cart
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/about">
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-4 mt-3">
            <i
              className="bi bi-search fs-4"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
            >
              <Search />
            </i>

            <div className="position-relative">
              <NavLink to="/wishlist" className="text-white fs-4">
                <i className="bi bi-bag-heart"></i>
              </NavLink>
              {wishlist?.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {wishlist?.length}
                </span>
              )}
            </div>

            <NavLink to="/profilePage" className="text-white fs-4">
              <i className="bi bi-person-circle"></i>
            </NavLink>

            <div className="position-relative">
              <NavLink to="/cart" className="text-white fs-4">
                <i className="bi bi-cart"></i>
              </NavLink>
              {cart?.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cart?.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
