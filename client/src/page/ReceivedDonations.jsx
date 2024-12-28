import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ReceivedDonations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/my-items/${user?.email}`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No donations received yet.
        </h2>
        <p className="text-gray-600 mb-6">
          Explore available donations and start collecting!
        </p>
        <Link
          to="/available-donation"
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg shadow-md hover:opacity-90 transition duration-300"
        >
          Browse Available Donations
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Received Donations
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Donor Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Donor Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Item Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-gray-700">{item.donner.name}</td>
                <td className="px-6 py-4 text-gray-700">{item.donner.email}</td>
                <td className="px-6 py-4 text-gray-700">{item.itemName}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceivedDonations;
