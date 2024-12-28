import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const DonationCard = ({ donation }) => {
  const { status, quantity, location, itemName, imageUrl, createdAt, _id } =
    donation || {};

  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return (
    <div
      className={`max-w-md mx-auto rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ${
        status === "available"
          ? "bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 hover:scale-105"
          : "bg-gray-200"
      }`}
    >
      <img src={imageUrl} alt={itemName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate mb-2">
          {itemName}
        </h2>
        <p className="text-gray-600 text-sm mb-3">Location: {location}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">
            Quantity: {quantity}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === "available"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status === "available" ? "Available" : "Unavailable"}
          </span>
        </div>
        <p className="text-gray-500 text-xs mb-4">Added {formattedDate}</p>
        <Link
          to={status === "available" ? `/donation-detail/${_id}` : "#"}
          className={`block text-center py-2 px-4 rounded-lg text-white font-medium shadow-md transition duration-300 ${
            status === "available"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {status === "available" ? "Collect Now" : "Unavailable"}
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;
