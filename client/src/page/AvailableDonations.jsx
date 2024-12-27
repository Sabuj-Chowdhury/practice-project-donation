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
  );
};

export default AvailableDonations;
