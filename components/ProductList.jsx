import { Link } from "react-router-dom";
const ProductList = ({ data, loading, error }) => {
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="container">
      <div className="m-4">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {data?.map((sneaker) => (
            <div key={sneaker._id}>
              <Link
                to={`/sneakerPage/${sneaker._id}`}
                className="text-decoration-none text-dark hover-text-primary"
              >
                <div class="col">
                  <div class="card">
                    <img
                      src={sneaker.image1Url}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        <small class="text-body-secondary">
                          {sneaker.brand}
                        </small>
                      </p>
                      <h5 class="card-title">{sneaker.sneakerName}</h5>
                      <p class="card-text">
                        <small class="text-body-secondary">
                          {sneaker.colors}
                        </small>
                      </p>
                      <p class="card-text">₹{sneaker.price}</p>
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
