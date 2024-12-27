import { useContext, useRef } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDonations = () => {
  const formRef = useRef(); //  ref for the form
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // Function to reset the form
  const handleReset = () => {
    const form = formRef.current;
    form.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);
    const { quantity, ...newDonation } = initialData;
    newDonation.quantity = parseInt(quantity);
    newDonation.donner = {
      email: user?.email,
      name: user?.displayName || {},
    };
    newDonation.status = "available"; //default
    newDonation.createdAt = new Date();
    newDonation.count = 0;
    console.log(newDonation);

    try {
      // Post request to add car
      await axios.post(`${import.meta.env.VITE_URL}/add-donation`, newDonation);

      // Reset form
      handleReset();
      // Show toast and navigate
      toast.success("Donation added successfully!");
      navigate("/my-donations");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Make a Donation
        </h2>

        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Notebook, Pencil"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a brief description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-semibold mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 10"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-semibold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Pabna"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., https://example.com/image.jpg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default AddDonations;
