import React, { useState } from "react";
import axios from "axios";

const SaleDeedForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    propertySize: "",
    saleAmount: "",
    date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/generate-pdf", form, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "sale-deed.pdf";
      link.click();

      alert("PDF created successfully!");


      setForm({
        fullName: "",
        fatherName: "",
        propertySize: "",
        saleAmount: "",
        date: "",
      });
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to create PDF.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Sale Deed Generator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded"
          required
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name *"
          value={form.fatherName}
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded"
          required
        />
        <input
          type="text"
          name="propertySize"
          placeholder="Property Size (sq.ft.) *"
          value={form.propertySize}
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded"
          required
        />
        <input
          type="number"
          name="saleAmount"
          placeholder="Sale Amount (₹) *"
          value={form.saleAmount}
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full font-semibold"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default SaleDeedForm;
