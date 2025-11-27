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
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            Search Sneakers...
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              class="btn btn-outline-success"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>

          <div className="offcanvas-body  justify-content-center align-items-center">
            {filteredData?.map((sneaker) => (
              <div class="card m-3" style={{ width: "19rem" }}>
                <img src={sneaker.image1Url} class="card-img-top" alt="..." />
                <div class="card-body">
                  <p class="card-text">
                    <strong>{sneaker.sneakerName}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
