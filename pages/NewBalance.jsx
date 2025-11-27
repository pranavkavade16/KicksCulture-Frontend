import useSneakersContext from '../context/SneakersContext';
import ProductList from '../components/ProductList';
const NewBalance = () => {
  const { sneakersData, sneakersLoading, sneakersError } = useSneakersContext();
  console.log(sneakersData);

  const newBalanceSneakers = sneakersData?.filter(
    (sneaker) => sneaker.brand === 'New Balance'
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
      <h1>New Balance</h1>
      <ProductList
        data={newBalanceSneakers}
        loading={sneakersLoading}
        error={sneakersError}
      />
    </div>
  );
};
export default NewBalance;
