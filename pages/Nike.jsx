import useFetch from "../customHooks/useFetch";
import ProductList from "../components/ProductList";
const Nike = () => {
  const {
    data: sneakersData,
    loading: sneakersLoading,
    error: sneakersError,
  } = useFetch("https://kicks-culture-backend.vercel.app/sneakers/Nike");
  if (sneakersLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );
  if (sneakersError) return <p>Error: {error}</p>;
  if (!sneakersData) return <p>No data available</p>;

  return (
    <div>
      <div className="container py-3">
        <h1 class="lexend-exa">Nike</h1>
        <ProductList
          data={sneakersData}
          loading={sneakersLoading}
          error={sneakersError}
        />
      </div>
    </div>
  );
};

export default Nike;
