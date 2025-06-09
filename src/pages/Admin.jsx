import React, { useState } from "react";

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    robloxLink: "",
    emailVerified: false,
    description: "",
    price: "",
    robux: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit your new account data here or update the listing array
    alert("Account submitted! (Hook this up to your backend)");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md text-gray-900"
            placeholder="Roblox username"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 13+"
            className="w-full p-2 rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Roblox Profile Link</label>
          <input
            type="url"
            name="robloxLink"
            value={formData.robloxLink}
            onChange={handleChange}
            placeholder="https://www.roblox.com/users/123456/profile"
            className="w-full p-2 rounded-md text-gray-900"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="emailVerified"
            checked={formData.emailVerified}
            onChange={handleChange}
            id="emailVerified"
            className="accent-indigo-600"
          />
          <label htmlFor="emailVerified" className="font-semibold">
            Email Verified
          </label>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 rounded-md text-gray-900"
            placeholder="Brief account description"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price (USD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 rounded-md text-gray-900"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Robux Amount</label>
          <input
            type="number"
            name="robux"
            value={formData.robux}
            onChange={handleChange}
            className="w-full p-2 rounded-md text-gray-900"
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition"
        >
          Add / Update Account
        </button>
      </form>
    </div>
  );
}
