import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthContext from "../context/AuthContext";

const DonationDetail = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Access the current user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/donation-detail/${id}`
        );
        setDonation(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching donation details:", error.message);
      }
    };
    fetchDonationDetails();
  }, [id]);

  const handleCollect = async () => {
    const { createdAt, count, _id, ...collectDonationData } = donation;
    collectDonationData.receiver = user.email;
    collectDonationData.donation_id = _id;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/collect-donation`,
        collectDonationData
      );
      //   console.log(data);

      toast.success("Collect Successfully!");
      navigate("/received-donations");
    } catch (err) {
      toast.error(err.message);
    }

    // console.log(collectDonationData);

    // console.log(id);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const {
    itemName,
    description,
    location,
    imageUrl,
    quantity,
    donner,
    status,
    createdAt,
    _id,
  } = donation;

  const isUserDonor = user.email === donner.email;
  const isDonationUnavailable = status !== "available" || isUserDonor;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={itemName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{itemName}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-700 font-medium">
              Location: {location}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                status === "available"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm">Quantity</p>
              <p className="text-gray-800 font-bold">{quantity}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-500 text-sm">Donor Information</p>
            <p className="text-gray-800 font-bold">{donner.name}</p>
            <p className="text-gray-600 text-sm">{donner.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Date Posted</p>
            <p className="text-gray-800 font-bold">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* collect button */}
          <button
            onClick={() => handleCollect(_id)}
            disabled={isDonationUnavailable}
            className={`mt-6 w-full py-3 rounded-lg shadow-md transition duration-300 ${
              isDonationUnavailable
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isDonationUnavailable ? "Unavailable" : "Collect Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
