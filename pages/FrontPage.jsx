import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import useSneakersContext from "../context/SneakersContext";

const FrontPage = () => {
  const { sneakersData, sneakersLoading, sneakersError } = useSneakersContext();
  const {
    data: newArrivalData,
    loading: newArrivalLoading,
    error: newArrivalError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/newArrival");

  if (sneakersLoading || newArrivalLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );
  if (sneakersError || newArrivalError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">
          Error: {sneakersError || newArrivalError}
        </p>
      </div>
    );
  if (!sneakersData || !newArrivalData)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );
  return (
    <div>
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <Link to={"/adidasSamba"}>
              <img
                src="https://www.superkicks.in/cdn/shop/files/DESKTOP-TOKYO-F.gif?v=1761723225"
                class="d-block w-100"
                alt="..."
              />
            </Link>
          </div>
          <div class="carousel-item">
            <Link to={"/somosEternos"}>
              <img
                src="https://www.superkicks.in/cdn/shop/files/2_-_2025-10-16T171816.615.png?v=1760615363"
                class="d-block w-100"
                alt="..."
              />
            </Link>
          </div>
          <div class="carousel-item">
            <Link to="/jordan">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_2158,c_limit/fa2a41d6-b2dd-4073-9d6a-a7ec7195f528/jordan-sport.png"
                class="d-block w-100"
                alt="..."
              />
            </Link>
          </div>
          <div class="carousel-item">
            <Link to="/jordan">
              <img
                src="https://static.nike.com/a/images/w_2880,h_1410,c_fill,f_auto/b2518af5-645e-4544-b81e-f49108b6dc4f/image.png"
                class="d-block w-100"
                alt="..."
              />
            </Link>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <h1 className="text-center">Built by Sneakerheads, for Sneakerheads.</h1>
      <br />
      <hr />
      <div className="m-3">
        <div className="mt-4">
          <h1 className="text-center lexend-exa">New Arrival</h1>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to="/newArrival" className="btn btn-dark btn-sm me-md-2 mb-2">
              View All
            </Link>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-4 g-4">
          {newArrivalData?.slice(0, 4).map((sneaker) => (
            <div>
              <Link
                to={`/sneakerPage/${sneaker._id}`}
                className="text-decoration-none text-dark hover-text-primary"
              >
                <div class="col" key={sneaker._id}>
                  <div class="card">
                    <img
                      src={sneaker.image1Url}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        <small class="text-body-secondary">
                          {sneaker.brand}
                        </small>
                      </p>
                      <h5 class="card-title">{sneaker.sneakerName}</h5>
                      <p class="card-text">
                        <small class="text-body-secondary">
                          {sneaker.colors}
                        </small>
                      </p>
                      <p class="card-text">₹{sneaker.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div class="card-group mt-4">
          <Link
            to={`/nike`}
            className="text-decoration-none text-dark hover-text-primary w-25"
          >
            <div class="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/Nike_4c272695-6369-4039-92b6-b497425de639.jpg?v=1755081263"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h3 class="card-title text-center">
                  <strong>Nike</strong>
                </h3>
                <p class="card-text text-center">
                  <strong>Just Do It</strong> <br /> Performance meets style for
                  athletes and trendsetters.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to={`/adidasOriginals`}
            className="text-decoration-none text-dark hover-text-primary w-25"
          >
            <div class="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/Adidas_ca63a075-a68e-4167-8f99-08ff5a81d4ae.jpg?v=1755081300"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h3 class="card-title text-center">
                  <strong>Adidas</strong>
                </h3>
                <p class="card-text text-center">
                  <strong> Impossible is Nothing</strong> <br /> Iconic
                  sportswear blending comfort and innovation.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to={`/newBalance`}
            className="text-decoration-none text-dark hover-text-primary w-25"
          >
            <div class="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/NB_c5174975-e857-4ed7-91e1-e10fec8cf7ff.jpg?v=1755081284"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h3 class="card-title text-center">
                  <strong>New Balance</strong>
                </h3>
                <p class="card-text text-center">
                  <strong>Balance Your World </strong> <br />
                  Premium sneakers for everyday comfort and classic style.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to={`/puma`}
            className="text-decoration-none text-dark hover-text-primary w-25"
          >
            <div class="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/Puma_371fcf9b-63ae-4fb8-816c-6e10c2e863da.jpg?v=1755081312"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h3 class="card-title text-center">
                  <strong>Puma</strong>
                </h3>
                <p class="card-text text-center">
                  <strong>Forever Faster </strong> <br />
                  Sport-inspired fashion with bold designs and energy.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-center lexend-exa mt-4">All Sneakers</h1> <br />
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/AllSneakers" className="btn btn-dark btn-sm md-2 me-3">
            View All
          </Link>
        </div>
      </div>
      <div className="m-3">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {sneakersData?.slice(0, 4).map((sneaker) => (
            <div key={sneaker._id}>
              <Link
                to={`/sneakerPage/${sneaker._id}`}
                className="text-decoration-none text-dark hover-text-primary"
              >
                <div class="col">
                  <div class="card">
                    <img
                      src={sneaker.image1Url}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        <small class="text-body-secondary">
                          {sneaker.brand}
                        </small>
                      </p>
                      <h5 class="card-title">{sneaker.sneakerName}</h5>
                      <p class="card-text">
                        <small class="text-body-secondary">
                          {sneaker.colors}
                        </small>
                      </p>
                      <p class="card-text">₹{sneaker.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
