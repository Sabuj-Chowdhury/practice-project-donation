import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/6740283/6740283-uhd_2560_1440_30fps.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Transforming Education, One Donation at a Time
        </h1>
        <button
          onClick={() => navigate("/available-donation")}
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          View Donations
        </button>
      </div>
    </div>
  );
};

export default Banner;
