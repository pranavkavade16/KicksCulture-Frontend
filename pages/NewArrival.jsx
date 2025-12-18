import useFetch from "../customHooks/useFetch";
import SideBar from "../components/SideBar";
import SortBy from "../components/SortBy";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import useFilter from "../customHooks/useFilter";

const NewArrival = () => {
  const {
    data: newArrivalData,

    loading: newArrivalLoading,

    error: newArrivalError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/newArrival");

  const { products, filters, handleFilter, handleSortChange, clearFilters } =
    useFilter(newArrivalData);

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
        <h1 className="lexend-exa">New Arrivals ({newArrivalData.length})</h1>
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
        <div class="row row-cols-1 row-cols-md-4 g-4"></div>
        <ProductList
          data={products}
          loading={newArrivalLoading}
          error={newArrivalError}
        />
      </div>
    </>
  );
};

export default NewArrival;
