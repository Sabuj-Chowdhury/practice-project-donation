import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import DonationCard from "../components/DonationCard";

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDonations = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/available-donations`
      );
      setDonations(data);
      setLoading(false);
    };
    fetchAllDonations();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {donations.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Donations Available
          </h2>
          <p className="text-gray-600 mb-6">
            Please check back later as we frequently add new donations!
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => (window.location.href = "/available-donation")}
          >
            Explore More
          </button>
        </div>
      ) : (
        <div className="container px-6 py-10 mx-auto">
          {/* Page Heading */}
          <h1 className="text-4xl font-bold text-center text-amber-900 mb-10">
            Available Donations
          </h1>

          {/* Donation Grid */}
          <div
            className={`grid gap-8 
     grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
   `}
          >
            {donations
              .filter((donation) => donation.status === "available")
              .map((donation, idx) => (
                <DonationCard key={idx} donation={donation} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AvailableDonations;
