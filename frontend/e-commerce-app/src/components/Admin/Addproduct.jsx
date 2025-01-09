import React, { useState } from "react";
import axios from "axios";

const AdminProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("old_price", oldPrice);
    formData.append("new_price", newPrice);
    formData.append("size", size);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "/api/admin/products/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="text" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
      <input type="number" placeholder="Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} required />
      <input type="number" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
      <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
      <input type="file" multiple onChange={handleFileChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AdminProductForm;
