import useSneakersContext from "../context/SneakersContext";
import ProductList from "../components/ProductList";
import useFilter from "../customHooks/useFilter";
import SideBar from "../components/SideBar";
import SortBy from "../components/SortBy";
const NewBalance = () => {
  const { sneakersData, sneakersLoading, sneakersError } = useSneakersContext();
  const { products, handleFilter, handleSortChange } = useFilter(sneakersData);
  console.log(sneakersData);

  const newBalanceSneakers = products?.filter(
    (sneaker) => sneaker.brand === "New Balance"
  );
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
      <h1 class="lexend-exa">New Balance</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SideBar onFilterChange={handleFilter} />
        <div className="m-4">
          <div className="d-flex align-items-center gap-2">
            <h5 className="mb-0">Sort By: </h5>
            <SortBy onSortChange={handleSortChange} />
          </div>
        </div>
      </div>
      <ProductList
        data={newBalanceSneakers}
        loading={sneakersLoading}
        error={sneakersError}
      />
    </div>
  );
};
export default NewBalance;
