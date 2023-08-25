import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelector = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (value) => {
    setValue(value);
  };

  return <Select options={options} value={value} onChange={handleChange} />;
};

export default CountrySelector;
