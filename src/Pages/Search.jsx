import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { API_KEY } from "../requests";
import MovieModal from "../Components/MovieModal";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Wrap searchMovies in useCallback to fix the warning
  const searchMovies = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching:", error);
      if (error.response?.status === 401 || error.response?.status === 402) {
        alert("API Key Error: Please add your TMDB API key in requests.js");
      }
    }
    setLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, searchMovies]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Search Bar */}
      <div className="fixed top-0 w-full bg-black z-50 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          {/* Back Button & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <img
              className="w-24 cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-gray-900 text-white px-4 py-3 pl-12 rounded-md border border-gray-700 focus:outline-none focus:border-white transition"
              />
              <svg
                className="w-5 h-5 absolute left-4 top-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Avatar */}
          <img
            className="w-8 h-8 rounded cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avatar"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="pt-24 px-4 md:px-12 pb-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* Empty State - No Search */}
        {!searchQuery && !loading && (
          <div className="text-center py-20">
            <svg
              className="w-20 h-20 mx-auto mb-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-2xl text-gray-400 mb-2">
              Search for movies and TV shows
            </h2>
            <p className="text-gray-500">Start typing to see results...</p>
          </div>
        )}

        {/* No Results Found */}
        {searchQuery && !loading && searchResults.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400 mb-2">
              No results found for "{searchQuery}"
            </h2>
            <p className="text-gray-500">
              Try different keywords or check your spelling
            </p>
          </div>
        )}

        {/* Search Results Grid */}
        {searchResults.length > 0 && !loading && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Search results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map(
                (item) =>
                  (item.poster_path || item.backdrop_path) && (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMovie(item)}
                      className="group cursor-pointer transition-transform duration-300 hover:scale-110"
                    >
                      <div className="relative overflow-hidden rounded-md">
                        <img
                          className="w-full h-auto object-cover"
                          src={`https://image.tmdb.org/t/p/w500${
                            item.poster_path || item.backdrop_path
                          }`}
                          alt={item.title || item.name}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-end p-3">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white font-semibold text-sm mb-1">
                              {item.title || item.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs">
                              {item.vote_average > 0 && (
                                <span className="text-green-400">
                                  ⭐ {item.vote_average.toFixed(1)}
                                </span>
                              )}
                              <span className="text-gray-400">
                                {item.media_type === "movie" ? "Movie" : "TV"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default Search;