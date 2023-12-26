import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  // const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setBrand(result.brand);
    setCategory(result.category);
  };

  const updateProduct = async () => {
    console.warn(name, price, brand, category);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, brand, category }),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };
  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Brand"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />

      <button className="appButton" type="button" onClick={updateProduct}>
        Update product
      </button>
    </div>
  );
};

export default UpdateProduct;
