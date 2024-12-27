import { formatDistanceToNow } from "date-fns";

const DonationCard = ({ donation }) => {
  const { status, quantity, location, itemName, imageUrl, createdAt, count } =
    donation || {};

  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt={itemName} className="w-full h-60 object-cover" />
      <div className="p-6 bg-white rounded-b-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{itemName}</h2>
        <p className="text-gray-600 mb-4">Location: {location}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">
            Quantity: {quantity}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === "available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4">Collect Count: {count}</p>
        <p className="text-gray-400 text-xs">Date Posted: {formattedDate}</p>
        <button className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-300">
          Collect Now
        </button>
      </div>
    </div>
  );
};

export default DonationCard;
