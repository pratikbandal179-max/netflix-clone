import { useState, useEffect } from "react";
import axios from "../api";
import { API_KEY } from "../requests";
import { useTheme } from "../context/ThemeContext";

function MovieModal({ movie, onClose }) {
  const [trailer, setTrailer] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    if (movie) {
      fetchMovieDetails();
    }
  }, [movie]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
      const id = movie.id;

      // Fetch movie/TV show details
      const detailsResponse = await axios.get(
        `/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovieDetails(detailsResponse.data);

      // Fetch videos (trailers)
      const videosResponse = await axios.get(
        `/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );

      const trailers = videosResponse.data.results.filter(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube"
      );

      if (trailers.length > 0) {
        setTrailer(trailers[0]);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setLoading(false);
  };

  if (!movie) return null;

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative ${colors.secondary} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {/* Video/Image Section */}
            <div className="relative w-full aspect-video bg-black">
              {trailer ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1&modestbranding=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${
                    movie.backdrop_path || movie.poster_path
                  }`}
                  alt={movie.title || movie.name}
                />
              )}

              {/* Gradient Overlay for Title */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
              
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {movie.title || movie.name}
                </h2>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 md:p-8">
              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mb-6">
                <button className="flex items-center bg-white text-black px-8 py-3 rounded font-bold hover:bg-opacity-80 transition">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play
                </button>

                <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    {movieDetails?.vote_average > 0 && (
                      <span className="text-green-400 font-semibold">
                        {Math.round(movieDetails.vote_average * 10)}% Match
                      </span>
                    )}
                    {(movieDetails?.release_date || movieDetails?.first_air_date) && (
                      <span className={colors.textSecondary}>
                        {new Date(
                          movieDetails.release_date || movieDetails.first_air_date
                        ).getFullYear()}
                      </span>
                    )}
                    {movieDetails?.runtime && (
                      <span className={colors.textSecondary}>
                        {Math.floor(movieDetails.runtime / 60)}h{" "}
                        {movieDetails.runtime % 60}m
                      </span>
                    )}
                    {movieDetails?.number_of_seasons && (
                      <span className={colors.textSecondary}>
                        {movieDetails.number_of_seasons} Season
                        {movieDetails.number_of_seasons > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  <p className={`${colors.text} text-base leading-relaxed`}>
                    {movieDetails?.overview || movie.overview}
                  </p>
                </div>

                {/* Right Column - Additional Info */}
                <div className={`space-y-3 text-sm ${colors.textSecondary}`}>
                  {movieDetails?.genres && movieDetails.genres.length > 0 && (
                    <div>
                      <span className={colors.textTertiary}>Genres: </span>
                      <span>
                        {movieDetails.genres.map((g) => g.name).join(", ")}
                      </span>
                    </div>
                  )}

                  {movieDetails?.vote_average > 0 && (
                    <div>
                      <span className={colors.textTertiary}>Rating: </span>
                      <span>⭐ {movieDetails.vote_average.toFixed(1)}/10</span>
                    </div>
                  )}

                  {movieDetails?.status && (
                    <div>
                      <span className={colors.textTertiary}>Status: </span>
                      <span>{movieDetails.status}</span>
                    </div>
                  )}

                  {movieDetails?.original_language && (
                    <div>
                      <span className={colors.textTertiary}>Language: </span>
                      <span>{movieDetails.original_language.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieModal;