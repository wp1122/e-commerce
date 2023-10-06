import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Display from "./Display";
import Header from "./Header";
import Filter from "./Filter";
import productsData from "../data/products.json";
import filter from "../assets/filter.png";

const defaultFilters = {};

let minPrice = 0; //for finding max and min price in products data
let maxPrice = Number.MIN_VALUE;

productsData.forEach((product) => {
  //looping through products data
  for (const key in product) {
    if (key === "price") {
      //if key is price
      defaultFilters[key] = defaultFilters[key] || {}; //creating an empty object named price in our defaultfilters object
      const price = product.price;
      maxPrice = Math.max(maxPrice, price); //finding maxprice from products data
    } else if (key === "color" || key === "gender" || key === "type") {
      //for other keys
      const value = product[key].toLowerCase();
      defaultFilters[key] = defaultFilters[key] || {}; //if obj doesnt exist make an empty obj else let it be
      defaultFilters[key][value] = false; //insert that specific key:val in that obj with val as false
    }
  }
});

const rangeSize = 150; //choosing default range interval of 150

//array of price range objects
const priceRanges = [];
for (
  let startPrice = minPrice;
  startPrice <= maxPrice;
  startPrice += rangeSize
) {
  const endPrice = startPrice + rangeSize - 1;
  priceRanges.push({
    label: `Rs ${startPrice} - Rs ${endPrice}`,
    min: startPrice,
    max: endPrice,
  });
}

let lastPriceRange, maxRangeVal; //for largest range in price : Over ₹ABC

priceRanges.forEach((range, index) => {
  //loop through priceRange array and insert in our price obj of defaultFilter obj
  if (index < priceRanges.length - 1)
    // other ranges are like ₹ABC - ₹XYZ
    defaultFilters.price[`₹${range.min} - ₹${range.max}`] = false;
  else {
    // for the special case of largest range which is Over ₹ABC
    defaultFilters.price[`Over ₹${range.min}`] = false;
    lastPriceRange = `Over ₹${range.min}`; //string "Over ₹ABC"
    maxRangeVal = range.min; //number value ABC
  }
});

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

    console.log(filters);

    Object.keys(filters).forEach((category) => {
      //looping through selected filters(using checkboxes)
      if (category === "price") {
        //if category is price
        if (Object.values(filters.price).includes(true)) {
          //if any of the price range is marked true
          filteredValues = filteredValues.filter((product) => {
            //loop through all products
            const price = product.price;
            for (const [key, value] of Object.entries(filters.price)) {
              //key = specific range in price, value=true/false
              if (value) {
                if (key == lastPriceRange) {
                  //special case of largest price range "₹ABC - ₹XYZ"
                  if (price >= maxRangeVal) return true;
                } else {
                  //normal price range "Over ₹ABC"
                  const [minStr, maxStr] = key.split(" - "); //split in two strings
                  const min = parseInt(minStr.slice(1)); // Removing the ₹ symbol and parse as integer
                  const max = parseInt(maxStr.slice(1));
                  if (price >= min && price <= max) {
                    return true;
                  }
                }
              }
            }
            return false; //if for a product, all the keys have been checked and none is true, return false
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
