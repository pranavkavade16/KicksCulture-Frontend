import useFetch from "../customHooks/useFetch";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const {
    data: sneakersData,
    loading: sneakersLoading,
    error: sneakersError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers");

  const getFilteredData = () => {
    let filtered = sneakersData;
    if (search || search.length > 0) {
      filtered = sneakersData.filter(
        (sneaker) =>
          sneaker.brand.toLowerCase().includes(search.toLowerCase()) ||
          sneaker.colors.toLowerCase().includes(search.toLowerCase()) ||
          sneaker.description.toLowerCase().includes(search.toLowerCase()) ||
          sneaker.sneakerName.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  const filteredData = getFilteredData();

  return (
    <div>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Search Sneakers...
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>

          <div className="offcanvas-body justify-content-center align-items-center">
            {search ? (
              filteredData?.map((sneaker) => (
                <div key={sneaker._id}>
                  <a
                    href={`/sneakerPage/${sneaker._id}`}
                    className="text-decoration-none text-dark hover-text-primary"
                  >
                    <div className="card m-3" style={{ width: "19rem" }}>
                      <img
                        src={sneaker.image1Url}
                        className="card-img-top"
                        alt="sneakerImage"
                      />
                      <div className="card-body">
                        <p className="card-text">{sneaker.sneakerName}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <p className="fw-medium text-danger">
                Search by brand, style, color, size, or price… Find your perfect
                sneakers!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
