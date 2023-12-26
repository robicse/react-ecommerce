import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !brand || !category) {
      setError(true);
      return false;
    }
    console.warn(name, price, brand, category);
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, brand, category, user_id }),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid Name!</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid Price!</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid Category!</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Brand"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />
      {error && !brand && (
        <span className="invalid-input">Enter Valid Brand!</span>
      )}
      <button className="appButton" type="button" onClick={addProduct}>
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
