import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file for styling

const App = () => {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchParams, setSearchParams] = useState({
    categoryId: "",
    subCategoryId: "",
    startDate: "",
    endDate: "",
    maxGuests: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: propertiesData } = await axios.get(
          "https://webtech-evolution-test.onrender.com/api/v1/properties/all",
          {
            data: {
              categoryId: searchParams.categoryId,
              subCategoryId: searchParams.subCategoryId,
              startDate: searchParams.startDate,
              endDate: searchParams.endDate,
              maxGuests: searchParams.maxGuests,
            },
          }
        );

        setProperties(propertiesData.data);

        const { data: categoriesData } = await axios.get(
          "https://webtech-evolution-test.onrender.com/api/v1/categories/all"
        );
        setCategories(categoriesData.data);

        const { data: subCategoriesData } = await axios.get(
          "https://webtech-evolution-test.onrender.com/api/v1/subCategories/all"
        );
        setSubCategories(subCategoriesData.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = (e) => {
    setSearchParams({
      categoryId: "",
      subCategoryId: "",
      startDate: "",
      endDate: "",
      maxGuests: "",
    });
  };
  // console.log(categories)
  // console.log(subCategories)
  // console.log(properties)

  return (
    <main className="container">
      <h1 className="title">Search Properties</h1>

      <div className="search-container">
        <select
          name="categoryId"
          value={searchParams.categoryId}
          onChange={handleChange}
          className="select-input"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="subCategoryId"
          value={searchParams.subCategoryId}
          onChange={handleChange}
          className="select-input"
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory._id}>
              {subCategory.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={searchParams.startDate}
          onChange={handleChange}
          className="date-input"
        />

        <input
          type="date"
          name="endDate"
          value={searchParams.endDate}
          onChange={handleChange}
          className="date-input"
        />

        <input
          type="number"
          name="maxGuests"
          placeholder="Max Guests"
          value={searchParams.maxGuests}
          onChange={handleChange}
          className="number-input"
        />

        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
      </div>

      <div>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="property-card">
              <h4 className="property-name">{property.propertyName}</h4>
              <p className="category">Category: {property.categoryName}</p>
              <p className="available-dates">
                Available Dates:{" "}
                <>
                  {property.availableDates.map((date) => (
                    <div key={date._id} className="date-range">
                      <span>
                        {new Date(date.from).toLocaleDateString()} -{" "}
                        {new Date(date.to).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </>
              </p>
              <p className="max-guests">Max Guests: {property.maxGuests}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No properties found</p>
        )}
      </div>
    </main>
  );
};

export default App;
