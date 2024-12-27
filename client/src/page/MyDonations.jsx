import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data function
  const fetchDonations = useCallback(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_URL}/my-donations/${user.email}`)
        .then((res) => {
          setDonations(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [user.email]);

  // Fetch donations
  useEffect(() => {
    if (user?.email) {
      fetchDonations();
    }
  }, [fetchDonations, user?.email]);

  // console.log(donations);

  // Delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/donation/${id}`);
      fetchDonations(); // Update the UI after deletion
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Confirmation delete
  const handleCustomDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Donation has been removed!.",
          icon: "success",
        });
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        {donations.length > 0
          ? `My Donations : ${donations.length}`
          : "No Donations Found"}
      </h1>

      {donations.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-4">
            You haven’t made any donations yet.
          </p>
          <Link
            to="/donate"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Make a Donation
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {donation.itemName}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={donation.imageUrl}
                      alt={donation.itemName}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(donation.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    {/* delete */}
                    <button
                      onClick={() => handleCustomDelete(donation._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                    {/* update button */}
                    <button
                      onClick={() => console.log(donation._id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
