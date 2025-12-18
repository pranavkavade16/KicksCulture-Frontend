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
        <select
          name=""
          id="sortBy"
          onChange={(event) => handleChange(event.target.value)}
          className="btn btn-secondary dropdown-toggle btn-sm"
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;
