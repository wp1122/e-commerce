import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Display from "./Display";
import Header from "./Header";
import Filter from "./Filter";
import productsData from "../data/products.json";
import filter from "../assets/filter.png";

const defaultFilters = {
  color: {
    red: false,
    blue: false,
    green: false,
    black: false,
    pink: false,
    purple: false,
    grey: false,
    white: false,
    yellow: false,
  },
  gender: {
    men: false,
    women: false,
  },
  type: {
    polo: false,
    hoodie: false,
    basic: false,
  },
  price: {
    "Under₹250": false,
    "₹251-₹450": false,
    "Over₹450": false,
  },
};

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchedWord, setSearchedWord] = useState();
  const [showFilter, setShowFilter] = useState(true);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function fetchProducts() {
      setFilteredProducts(productsData);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFiltering();
  }, [filters]);

  useEffect(() => {
    if (windowSize < 576) {
      setShowFilter(false);
      setShowToggleButton(true);
    } else {
      setShowToggleButton(false);
      setShowFilter(true);
    }
  }, [windowSize]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getMatchingWordsCount = (product) => {
    let count = 0;
    const searchedArray = searchedWord.toLowerCase().split(" ");
    for (const word of searchedArray) {
      if (
        product.color.toLowerCase().includes(word) ||
        product.type.toLowerCase().includes(word) ||
        product.name.toLowerCase().includes(word)
      ) {
        count = count + 1;
      }
    }
    return count;
  };

  const handleSorting = (product1, product2) => {
    return getMatchingWordsCount(product2) - getMatchingWordsCount(product1);
  };

  const handleSearchWord = (product) => {
    const searchedArray = searchedWord.toLowerCase().split(" ");
    for (const word of searchedArray) {
      if (
        product.color.toLowerCase().includes(word) ||
        product.type.toLowerCase().includes(word) ||
        product.name.toLowerCase().includes(word)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleFiltering = () => {
    let filteredValues = productsData;
    if (searchedWord && searchedWord !== "") {
      filteredValues = filteredValues.filter((product) =>
        handleSearchWord(product)
      );
      filteredValues.sort(handleSorting);
    }

    Object.keys(filters).forEach((category) => {
      if (category === "price") {
        if (Object.values(filters.price).includes(true)) {
          filteredValues = filteredValues.filter((product) => {
            if (product.price <= 250 && filters.price["Under₹250"]) return true;
            else if (
              product.price > 250 &&
              product.price <= 450 &&
              filters.price["₹251-₹450"]
            )
              return true;
            else if (product.price > 450 && filters.price["Over₹450"])
              return true;
            else return false;
          });
        }
      } else {
        const selectedValues = [];
        for (const [key, value] of Object.entries(filters[category])) {
          //category=color,gender,price
          if (value) selectedValues.push(key);
        }
        if (selectedValues.length > 0) {
          filteredValues = filteredValues.filter((product) =>
            selectedValues.includes(product[category].toLowerCase())
          );
        }
      }
    });
    setFilteredProducts(filteredValues);
  };

  return (
    <>
      <div className="row bg-light pt-2 pb-2 pr-2 pl-2 justify-content-between">
        <Header />
      </div>
      <div className="row input-group  justify-content-around">
        <div className="col-12 col-sm-6 mb-3">
          <div className="input-group">
            <SearchBar
              setSearchedWord={setSearchedWord}
              searchedWord={searchedWord}
              handleFiltering={handleFiltering}
            />
            {showToggleButton && (
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn m-1 btn-secondary"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <img
                    alt="filtericon"
                    src={filter}
                    style={{ filter: "invert(1)" }}
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-around">
        {showFilter && (
          <div className="col-11 col-sm-3">
            <Filter
              filters={filters}
              defaultFilters={defaultFilters}
              setFilters={setFilters}
            />
          </div>
        )}
        <div className="col-12 col-sm-9">
          <Display products={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default Home;
