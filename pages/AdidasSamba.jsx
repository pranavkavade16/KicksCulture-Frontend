import useFetch from "../customHooks/useFetch";
import ProductList from "../components/ProductList";
const AdidasSamba = () => {
  const {
    data: sneakersData,
    loading: sneakersLoading,
    error: sneakersError,
  } = useFetch(
    "https://kicks-culture-backend.vercel.app/sneakers/Adidas Originals"
  );

  const sambas = sneakersData?.filter((sneaker) =>
    sneaker.sneakerName.includes("Samba")
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
    <div>
      <div className="container py-3">
        <h1 className="lexend-exa">Samba Shoes</h1>
        <ProductList
          data={sambas}
          loading={sneakersLoading}
          error={sneakersError}
        />
      </div>
    </div>
  );
};

export default AdidasSamba;
