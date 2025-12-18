import { useState } from "react";

const SortBy = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState("Price");
  console.log(sortBy);

  const handleChange = (option) => {
    setSortBy(option);
    onSortChange(option);
  };
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle btn-sm"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {sortBy}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleChange("lowToHigh")}
            >
              Price, low to high
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => handleChange("highToLow")}
            >
              Price, high to low
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortBy;
