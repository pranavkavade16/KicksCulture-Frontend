import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import SortBy from "../components/SortBy";
import useSneakersContext from "../context/SneakersContext";
import useFilter from "../customHooks/useFilter";
import Toast from "../components/Toast";
import { useState } from "react";

const AllSneakers = () => {
  const { sneakersData, sneakersLoading, sneakersError } = useSneakersContext();

  const { products, filters, handleFilter, handleSortChange, clearFilters } =
    useFilter(sneakersData);

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
        <p className="text-dark fs-5">Error: {sneakersError}</p>
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
      <h1 className="lexend-exa">All Sneakers</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SideBar
          onFilterChange={handleFilter}
          filters={filters}
          clearFilters={clearFilters}
        />
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
