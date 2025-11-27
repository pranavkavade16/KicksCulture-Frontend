import { NavLink } from "react-router-dom";
import Search from "./Search";
import useSneakersContext from "../context/SneakersContext";

const NavBar = () => {
  const { cartData } = useSneakersContext();

  return (
    <header className="bg-dark text-light">
      <div className=" mx-auto">
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
                    to="/shoppingCart"
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
                class="bi bi-search"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <Search />
              </i>
            </h4>
            <h4 className="m-3 ms-2">
              <a href="/wishlist" style={{ color: "white" }}>
                <i class="bi bi-bag-heart"></i>
              </a>
            </h4>
            <h4 className="m-3 ms-2">
              <a href="/profilePage" style={{ color: "white" }}>
                <i class="bi bi-person-circle"></i>
              </a>
            </h4>
            <h4 className="m-3 ms-2">
              <a href="/cart" style={{ color: "white" }}>
                <i class="bi bi-cart"> </i>
              </a>
              {cartData?.length > 0 ? (
                <span
                  class="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem", padding: "0.2em 0.4em" }}
                >
                  {cartData?.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              ) : null}
            </h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
