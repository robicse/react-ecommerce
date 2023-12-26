import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    // auth product lists
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("result", result);
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    // let result = await fetch(`http://localhost:5000/products/${id}`, {
    // auth product lists
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    if (result.status == 401) {
      alert("This user is not owner of this product.");
    }
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log("result", result.result);
      if (result) {
        setProducts(result.result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search Product"
        className="search-product-box"
        onChange={searchHandle}
      />
      <ul>
        <li>SL NO</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Brand</li>
        <li>Operation</li>
      </ul>
      {products && products?.length > 0 ? (
        products?.map((item, index) => (
          <ul>
            <li>{index + 1}</li>
            <li>{item?.name}</li>
            <li>TK.{item?.price}</li>
            <li>{item?.category}</li>
            <li>{item?.brand}</li>
            <li>
              <button onClick={() => deleteProduct(item.id)}>Delete</button>
              <Link to={`/update/${item.id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>NO Product Founds!</h1>
      )}
    </div>
  );
};

export default ProductList;
