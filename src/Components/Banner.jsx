import { useEffect, useState } from "react";
import axios from "../api";
import requests from "../requests";
import MovieModal from "./MovieModal";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchTrending);
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  if (!movie) return null;

  return (
    <>
      <header
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />

        {/* Content */}
        <div className="relative flex h-full items-end pb-48 px-6 md:px-12">
          <div className="max-w-md md:max-w-xl space-y-5">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            {/* Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-white text-black px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-80 transition"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Play
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-gray-600 bg-opacity-70 text-white px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-50 transition"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                More Info
              </button>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-md">
              {truncate(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </header>

      {/* Movie Modal */}
      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default Banner;