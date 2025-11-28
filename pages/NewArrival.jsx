import useFetch from "../customHooks/useFetch";
import SideBar from "../components/SideBar";
import SortBy from "../components/SortBy";
import { useState, useEffect } from "react";
const NewArrival = () => {
  const {
    data: newArrivalData,
    loading: newArrivalLoading,
    error: newArrivalError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/newArrival");

  const [products, setProducts] = useState(newArrivalData);
  const [filters, setFilters] = useState({ sizes: [], brands: [], gender: [] });

  useEffect(() => {
    setProducts(newArrivalData);
  }, [newArrivalData]);

  const handleSizeFilter = (event, type) => {
    const { value, checked } = event.target;

    const updatedValue = checked
      ? [...filters[type], value]
      : filters[type].filter((item) => item != value);

    const newFilters = { ...filters, [type]: updatedValue };
    setFilters(newFilters);

    let filtered = newArrivalData;

    if (newFilters.sizes.length > 0) {
      filtered = newArrivalData.filter((sneaker) =>
        sneaker.sizeAvailable.some((size) =>
          newFilters.sizes.includes(size.toString())
        )
      );
    }

    if (newFilters.brands.length > 0) {
      filtered = newArrivalData.filter((sneaker) =>
        newFilters.brands.includes(sneaker.brand)
      );
    }

    if (newFilters.gender.length > 0) {
      filtered = newArrivalData.filter((sneaker) =>
        newFilters.gender.includes(sneaker.gender)
      );
    }
    setProducts(filtered);
  };

  const handleSortChange = (option) => {
    let sortedProducts = [...products];
    if (option === "Price") {
      setProducts(newArrivalData);
    } else if (option === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (option === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
    console.log(products);
  };
  if (newArrivalLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );
  if (newArrivalError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">Error: {newArrivalError}</p>
      </div>
    );
  if (!newArrivalData)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );

  return (
    <>
      <div className="container py-3">
        <h1 class="lexend-exa">New Arrivals ({newArrivalData.length})</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SideBar onFilterChange={handleSizeFilter} />
          <div className="m-4">
            <div className="d-flex align-items-center gap-2">
              <h5 className="mb-0">Sort By: </h5>
              <SortBy onSortChange={handleSortChange} />
            </div>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {products?.map((sneaker) => (
            <div class="col" key={sneaker._id}>
              <div class="card">
                <img src={sneaker.image1Url} class="card-img-top" alt="..." />
                <div class="card-body">
                  <p class="card-text">
                    <small class="text-body-secondary">{sneaker.brand}</small>
                  </p>
                  <h5 class="card-title">{sneaker.sneakerName}</h5>
                  <p class="card-text">
                    <small class="text-body-secondary">{sneaker.colors}</small>
                  </p>
                  <p class="card-text">₹{sneaker.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewArrival;
