import React from "react";

function capitalizeFLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Filter = (props) => {
  const handleFilterChange = (e) => {
    const checked = e.target.checked;

    const [type, value] = e.target.name.split(":");

    props.setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [type]: {
          ...prevFilters[type],
          [value]: checked,
        },
      };
    });
  };

  return (
    <div className="card p-4 shadow ">
      {Object.keys(props.defaultFilters).map((category, i) => {
        return (
          <div key={i} className="col  mb-3">
            <h6>{capitalizeFLetter(category)}</h6>
            <ul className="list-group">
              {Object.keys(props.defaultFilters[category]).map((key, j) => {
                return (
                  <li key={j}>
                    <input
                      value={props.filters[category][key]}
                      type="checkbox"
                      id={`${category}:${key}`}
                      onChange={handleFilterChange}
                      name={`${category}:${key}`}
                      aria-label="Checkbox for following text input"
                    />
                    <span className="m-2">
                      <strong>{capitalizeFLetter(key)}</strong>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
