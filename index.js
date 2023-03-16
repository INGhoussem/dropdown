const React = require('react');
const { useState } = React;

const countries = [
  { name: "France", regions: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Bretagne"] },
  { name: "Allemagne", regions: ["Bavière", "Rhénanie-du-Nord-Westphalie", "Bade-Wurtemberg"] },
  { name: "Italie", regions: ["Lombardie", "Toscane", "Campanie"] },
  { name: "Tunisie", regions: ["Ariana", "Tunis", "Nabeul", "Bizerte", "Sfax", "Sousse", "Monastir", "Gafsa"] },
];

const Dropdown = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    React.createElement("select", { value: selectedValue, onChange: handleChange },
      React.createElement("option", { value: "" }, "--Choisir une option--"),
      options.map((option) => (
        React.createElement("option", { key: option, value: option }, option)
      ))
    )
  );
};

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleCountrySelect = (value) => {
    setSelectedCountry(value);
    setSelectedRegion("");
  };

  const handleRegionSelect = (value) => {
    setSelectedRegion(value);
  };

  const selectedCountryData = countries.find(
    (country) => country.name === selectedCountry
  );
  const regions = selectedCountryData ? selectedCountryData.regions : [];

  return (
    React.createElement("div", null,
      React.createElement(Dropdown, { options: countries.map((country) => country.name), onSelect: handleCountrySelect }),
      selectedCountry && (
        React.createElement(Dropdown, { options: regions, onSelect: handleRegionSelect })
      ),
      selectedRegion && (
        React.createElement("p", null, `Vous avez sélectionné la région ${selectedRegion} en ${selectedCountry}`)
      )
    )
  );
};

module.exports = App;


