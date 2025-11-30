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
    let filtered;
    if (!Array.isArray(sneakersData)) {
      filtered = [];
      return filtered;
    }
    if (search.trim() === "") {
      filtered = sneakersData;
      return filtered;
    }

    filtered = sneakersData.filter(
      (sneaker) =>
        sneaker.brand.toLowerCase().includes(search.toLowerCase()) ||
        sneaker.colors.toLowerCase().includes(search.toLowerCase()) ||
        sneaker.description.toLowerCase().includes(search.toLowerCase()) ||
        sneaker.sneakerName.toLowerCase().includes(search.toLowerCase())
    );

    return filtered;
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
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>

          <div className="offcanvas-body  justify-content-center align-items-center">
            {filteredData?.map((sneaker) => (
              <div className="card m-3" style={{ width: "19rem" }}>
                <img src={sneaker.image1Url} class="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-text">
                    <strong>{sneaker.sneakerName}</strong>
                  </p>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <p className="text-center">No sneakers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
