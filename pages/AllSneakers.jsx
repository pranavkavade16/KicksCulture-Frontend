import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import SortBy from "../components/SortBy";
import { useEffect, useState } from "react";
import useSneakersContext from "../context/SneakersContext";
const AllSneakers = () => {
  const { sneakersData, sneakersLoading, sneakersError } = useSneakersContext();
  const [products, setProducts] = useState(sneakersData);
  const [filters, setFilters] = useState({ sizes: [], brands: [], gender: [] });

  useEffect(() => {
    setProducts(sneakersData);
  }, [sneakersData]);

  const handleSizeFilter = (event, type) => {
    const { value, checked } = event.target;

    const updatedValue = checked
      ? [...filters[type], value]
      : filters[type].filter((item) => item != value);

    const newFilters = { ...filters, [type]: updatedValue };
    setFilters(newFilters);

    let filtered = sneakersData;

    if (newFilters.sizes.length > 0) {
      filtered = sneakersData.filter((sneaker) =>
        sneaker.sizeAvailable.some((size) =>
          newFilters.sizes.includes(size.toString())
        )
      );
    }

    if (newFilters.brands.length > 0) {
      filtered = sneakersData.filter((sneaker) =>
        newFilters.brands.includes(sneaker.brand)
      );
    }

    if (newFilters.gender.length > 0) {
      filtered = sneakersData.filter((sneaker) =>
        newFilters.gender.includes(sneaker.gender)
      );
    }
    setProducts(filtered);
  };

  const handleSortChange = (option) => {
    let sortedProducts = [...products];
    if (option === "Price") {
      setProducts(sneakersData);
    } else if (option === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (option === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
    console.log(products);
  };

  if (sneakersLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );
  if (sneakersError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">
          Error: {sneakersError || newArrivalError}
        </p>
      </div>
    );
  if (!sneakersData)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-dark fs-5">No Data Available.</p>
      </div>
    );
  return (
    <div className="container py-3">
      <h1 class="lexend-exa">All Sneakers</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SideBar onFilterChange={handleSizeFilter} />
        <div className="m-4">
          <div className="d-flex align-items-center gap-2">
            <h5 className="mb-0">Sort By: </h5>
            <SortBy onSortChange={handleSortChange} />
          </div>
        </div>
      </div>
      <ProductList
        data={products}
        loading={sneakersLoading}
        error={sneakersError}
      />
    </div>
  );
};

export default AllSneakers;
