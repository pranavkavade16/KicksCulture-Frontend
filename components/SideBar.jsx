import useSneakersContext from "../context/SneakersContext";
import { useState } from "react";
const SideBar = ({ onFilterChange }) => {
  const { sneakersData } = useSneakersContext();
  const allSizes = [
    ...new Set(sneakersData?.flatMap((sneaker) => sneaker.sizeAvailable)),
  ];
  const allBrands = [
    ...new Set(sneakersData?.flatMap((sneaker) => sneaker.brand)),
  ];

  const gender = [
    ...new Set(sneakersData?.flatMap((sneakersData) => sneakersData.gender)),
  ];

  return (
    <div>
      <a
        class="btn btn-outline-secondary btn-sm my-3"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <i class="bi bi-filter-left"></i>
        Filters
      </a>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            Filter
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Shoe Size (UK)
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  {allSizes.map((size) => (
                    <div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={size}
                          id={`size-${size}`}
                          onChange={(e) => onFilterChange(e, "sizes")}
                        />
                        <label
                          class="form-check-label"
                          htmlFor={`size-${size}`}
                        >
                          {size}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Brand
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  {allBrands.map((brand) => (
                    <div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={brand}
                          id={`brand - ${brand}`}
                          onChange={(e) => onFilterChange(e, "brands")}
                        />
                        <label
                          class="form-check-label"
                          htmlFor={`brand-${brand}`}
                        >
                          {brand}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Gender
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  {gender.map((gender) => (
                    <div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={gender}
                          id={`brand - ${gender}`}
                          onChange={(e) => onFilterChange(e, "genders")}
                        />
                        <label
                          class="form-check-label"
                          htmlFor={`gender-${gender}`}
                        >
                          {gender}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
