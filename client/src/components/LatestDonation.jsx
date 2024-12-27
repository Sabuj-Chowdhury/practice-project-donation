import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import DonationCard from "./DonationCard";

const LatestDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/latest-donations`)
      .then((res) => {
        setDonations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);
  console.log(donations);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  // console.log(cars);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400">
        Recent Donations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.map((donation, index) => (
          <DonationCard key={index} donation={donation}></DonationCard>
        ))}
      </div>
    </div>
  );
};

export default LatestDonation;
