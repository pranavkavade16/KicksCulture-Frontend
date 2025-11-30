import { Link } from "react-router-dom";
const ProductList = ({ data, loading, error }) => {
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="container">
      <div className="m-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {data?.map((sneaker) => (
            <div key={sneaker._id}>
              <Link
                to={`/sneakerPage/${sneaker._id}`}
                className="text-decoration-none text-dark hover-text-primary"
              >
                <div className="col">
                  <div className="card">
                    <img
                      src={sneaker.image1Url}
                      className="card-img-top"
                      alt="sneakerPhoto"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {sneaker.brand}
                        </small>
                      </p>
                      <h5 className="card-title">{sneaker.sneakerName}</h5>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {sneaker.colors}
                        </small>
                      </p>
                      <p className="card-text">₹{sneaker.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
