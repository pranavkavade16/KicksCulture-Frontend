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
        className="btn btn-outline-secondary btn-sm my-3"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <i className="bi bi-filter-left"></i>
        Filters
      </a>
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
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
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {allSizes.map((size) => (
                    <div>
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={size}
                          id={`size-${size}`}
                          onChange={(e) => onFilterChange(e, "sizes")}
                        />
                        <label
                          className="form-check-label"
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
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
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
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {allBrands.map((brand) => (
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={brand}
                          id={`brand - ${brand}`}
                          onChange={(e) => onFilterChange(e, "brands")}
                        />
                        <label
                          className="form-check-label"
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
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
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
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {gender.map((gender) => (
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={gender}
                          id={`brand - ${gender}`}
                          onChange={(e) => onFilterChange(e, "genders")}
                        />
                        <label
                          className="form-check-label"
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
