import { useState, useEffect } from "react";
const useFilter = (sneakersData) => {
  const [products, setProducts] = useState(sneakersData);
  const [filters, setFilters] = useState({ sizes: [], brands: [], gender: [] });

  useEffect(() => {
    if (Array.isArray(sneakersData)) {
      setProducts(sneakersData);
    } else {
      setProducts([]);
    }
  }, [sneakersData]);

  const handleFilter = (event, type) => {
    const { value, checked } = event.target;

    const updatedValue = checked
      ? [...filters[type], value]
      : filters[type].filter((item) => item != value);

    const newFilters = { ...filters, [type]: updatedValue };
    setFilters(newFilters);

    let filtered = sneakersData;

    if (newFilters.sizes.length > 0) {
      filtered = sneakersData.filter((sneaker) =>
        sneaker.sizeAvailable.some((size) =>
          newFilters.sizes.includes(size.toString())
        )
      );
    }

    if (newFilters.brands.length > 0) {
      filtered = sneakersData.filter((sneaker) =>
        newFilters.brands.includes(sneaker.brand)
      );
    }

    if (newFilters.gender.length > 0) {
      filtered = sneakersData.filter((sneaker) =>
        newFilters.gender.includes(sneaker.gender)
      );
    }
    setProducts(filtered);
  };

  const handleSortChange = (option) => {
    let sortedProducts = [...products];
    if (option === "Price") {
      setProducts(sneakersData);
    } else if (option === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (option === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
    console.log(products);
  };
  return { products, handleFilter, handleSortChange };
};

export default useFilter;
