import { useState, useMemo, useCallback, useEffect } from "react";

const useFilter = (sneakersData = []) => {
  const [filters, setFilters] = useState({
    sizes: [],
    brands: [],
    gender: [],
    rating: [],
  });

  const [sortOption, setSortOption] = useState(null);

  const baseData = Array.isArray(sneakersData) ? sneakersData : [];

  const filteredProducts = useMemo(() => {
    return baseData.filter((sneaker) => {
      if (filters.sizes.length > 0) {
        const selectedSizes = new Set(filters.sizes.map(String));
        const hasSize = (sneaker.sizeAvailable || []).some((size) =>
          selectedSizes.has(String(size))
        );
        if (!hasSize) return false;
      }

      if (filters.brands.length > 0) {
        const selectedBrands = new Set(filters.brands);
        if (!selectedBrands.has(sneaker.brand)) return false;
      }

      if (filters.gender.length > 0) {
        const selectedGender = new Set(filters.gender);
        if (!selectedGender.has(sneaker.gender)) return false;
      }

      if (filters.rating.length > 0) {
        const minRating = Math.min(...filters.rating.map(Number));
        if (Number(sneaker.rating ?? 0) < minRating) return false;
      }

      return true;
    });
  }, [baseData, filters]);

  const products = useMemo(() => {
    const array = [...filteredProducts];
    if (sortOption === "lowToHigh") {
      array.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "highToLow") {
      array.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return array;
  }, [filteredProducts, sortOption]);

  const handleFilter = useCallback((event, type) => {
    const { value, checked } = event.target;

    setFilters((prev) => {
      const prevValues = prev[type] ?? [];
      const nextValues = checked
        ? [...prevValues, value]
        : prevValues.filter((item) => item !== value);

      return { ...prev, [type]: nextValues };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ sizes: [], brands: [], gender: [], rating: [] });
  }, []);

  const handleSortChange = useCallback((option) => {
    setSortOption(option || null);
  }, []);

  useEffect(() => {
    setSortOption(null);
  }, [sneakersData]);

  return {
    products,
    filters,
    sortOption,
    handleFilter,
    handleSortChange,
    clearFilters,
  };
};

export default useFilter;
