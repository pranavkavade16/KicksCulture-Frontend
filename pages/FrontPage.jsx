import { Link } from 'react-router-dom';

import useFetch from '../customHooks/useFetch';

import useSneakersContext from '../context/SneakersContext';

import ProductList from '../components/ProductList';

const FrontPage = () => {
  const { sneakersData, sneakersLoading, sneakersError } = useSneakersContext();

  const {
    data: newArrivalData,

    loading: newArrivalLoading,

    error: newArrivalError,
  } = useFetch('https://kicks-culture-backend.vercel.app/sneakers/newArrival');

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
    <div className="overflow-hidden">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
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
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to={'/adidasSamba'}>
              <img
                src="https://www.superkicks.in/cdn/shop/files/DESKTOP-TOKYO-F.gif?v=1761723225"
                className="d-block w-100 img-fluid"
                alt="adidasCoverPhoto"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to={'/somosEternos'}>
              <img
                src="https://www.superkicks.in/cdn/shop/files/2_-_2025-10-16T171816.615.png?v=1760615363"
                className="d-block w-100 img-fluid"
                alt="somosEternosCoverPhoto"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/jordan">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_2158,c_limit/fa2a41d6-b2dd-4073-9d6a-a7ec7195f528/jordan-sport.png"
                className="d-block w-100 img-fluid"
                alt="JordanCoverPhoto"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/saleheBembury">
              <img
                src="https://www.superkicks.in/cdn/shop/files/d_2.jpg?v=1764659589"
                className="d-block w-100 img-fluid"
                alt="JordanCoverPhoto"
              />
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container mt-4 mb-4">
        <h1 className="text-center">
          Built by Sneakerheads, for Sneakerheads.
        </h1>
      </div>
      <hr />
      <div>
        <div className="m-2">
          <h1 className="text-center lexend-exa mt-4">New Arrival</h1>
          <div className="d-flex justify-content-center mb-3">
            <Link to="/newArrival" className="btn btn-dark btn-sm mt-3">
              View All
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {newArrivalData?.slice(0, 4).map((sneaker) => (
              <div key={sneaker._id}>
                <Link
                  to={`/sneakerPage/${sneaker._id}`}
                  className="text-decoration-none text-dark hover-text-primary"
                >
                  <div className="col">
                    <div className="card h-100 shadow-sm">
                      <img
                        src={sneaker.image1Url}
                        className="card-img-top img-fluid"
                        alt="sneakerPhoto"
                      />
                      <div className="card-body">
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {sneaker.brand}
                          </small>
                        </p>
                        <h5 className="card-title">{sneaker.sneakerName}</h5>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {sneaker.colors}
                          </small>
                        </p>
                        <p className="card-text">₹{sneaker.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="conatiner mt-4">
        <div className="card-group mt-4">
          <Link
            to={`/nike`}
            className="text-decoration-none text-dark hover-text-primary w-25"
          >
            <div className="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/Nike_4c272695-6369-4039-92b6-b497425de639.jpg?v=1755081263"
                className="card-img-top img-fluid"
                alt="nike"
              />
              <div className="card-body">
                <h3 className="card-title text-center">
                  <strong>Nike</strong>
                </h3>
                <p className="card-text text-center">
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
            <div className="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/Adidas_ca63a075-a68e-4167-8f99-08ff5a81d4ae.jpg?v=1755081300"
                className="card-img-top img-fluid"
                alt="adidasOriginals"
              />
              <div className="card-body">
                <h3 className="card-title text-center">
                  <strong>Adidas</strong>
                </h3>
                <p className="card-text text-center">
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
            <div className="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/NB_c5174975-e857-4ed7-91e1-e10fec8cf7ff.jpg?v=1755081284"
                className="card-img-top img-fluid"
                alt="newBalance"
              />
              <div className="card-body">
                <h3 className="card-title text-center">
                  <strong>New Balance</strong>
                </h3>
                <p className="card-text text-center">
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
            <div className="card">
              <img
                src="https://www.superkicks.in/cdn/shop/files/Puma_371fcf9b-63ae-4fb8-816c-6e10c2e863da.jpg?v=1755081312"
                className="card-img-top img-fluid"
                alt="puma"
              />
              <div className="card-body">
                <h3 className="card-title text-center">
                  <strong>Puma</strong>
                </h3>
                <p className="card-text text-center">
                  <strong>Forever Faster </strong> <br />
                  Sport-inspired fashion with bold designs and energy.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className=" container mt-5">
        <h1 className="text-center lexend-exa mt-4">All Sneakers</h1> <br />
        <div className="d-flex justify-content-center mb-3">
          <Link to="/AllSneakers" className="btn btn-dark btn-sm md-2 ">
            View All
          </Link>
        </div>
      </div>
      <div className="m-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {sneakersData?.slice(0, 4).map((sneaker) => (
            <div key={sneaker._id}>
              <Link
                to={`/sneakerPage/${sneaker._id}`}
                className="text-decoration-none text-dark hover-text-primary"
              >
                <div className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={sneaker.image1Url}
                      className="card-img-top img-fluid"
                      alt="sneakerPhoto"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {sneaker.brand}
                        </small>
                      </p>
                      <h5 className="card-title">{sneaker.sneakerName}</h5>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {sneaker.colors}
                        </small>
                      </p>
                      <p className="card-text">₹{sneaker.price}</p>
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
