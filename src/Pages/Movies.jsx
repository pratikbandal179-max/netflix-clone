import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import axios from "../api";
import { API_KEY } from "../requests";
import { useTheme } from "../context/ThemeContext";

function Movies() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      // Fetch trending movies for banner
      const trending = await axios.get(
        `/trending/movie/week?api_key=${API_KEY}&language=en-US`
      );
      setFeaturedMovie(
        trending.data.results[
          Math.floor(Math.random() * trending.data.results.length)
        ]
      );
      setTrendingMovies(trending.data.results);

      // Fetch popular movies
      const popular = await axios.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      setPopularMovies(popular.data.results);

      // Fetch top rated movies
      const topRated = await axios.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      setTopRatedMovies(topRated.data.results);

      // Fetch Action movies (Genre ID: 28)
      const action = await axios.get(
        `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`
      );
      setActionMovies(action.data.results);

      // Fetch Comedy movies (Genre ID: 35)
      const comedy = await axios.get(
        `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`
      );
      setComedyMovies(comedy.data.results);

      // Fetch Horror movies (Genre ID: 27)
      const horror = await axios.get(
        `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`
      );
      setHorrorMovies(horror.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const MovieRow = ({ title, movies }) => (
    <div className="ml-5 text-white mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>
      <div className="flex overflow-y-hidden overflow-x-scroll space-x-2 p-5 scrollbar-hide">
        {movies.map(
          (movie) =>
            movie.poster_path && (
              <img
                key={movie.id}
                className="max-h-36 md:max-h-48 object-contain mr-2 transition-transform duration-450 hover:scale-110 cursor-pointer rounded-sm"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <Nav />

      {/* Featured Movie Banner */}
      {featuredMovie && (
        <header
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path}")`,
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
                {featuredMovie?.title || featuredMovie?.original_title}
              </h1>

              {/* Info */}
              <div className="flex items-center space-x-4 text-sm md:text-base">
                {featuredMovie.vote_average > 0 && (
                  <span className="text-green-400 font-semibold">
                    ⭐ {featuredMovie.vote_average.toFixed(1)}
                  </span>
                )}
                {featuredMovie.release_date && (
                  <span className="text-gray-300">
                    {new Date(featuredMovie.release_date).getFullYear()}
                  </span>
                )}
                <span className="px-2 py-1 border border-gray-400 text-gray-300 text-xs">
                  Movie
                </span>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center bg-white text-black px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-80 transition">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play
                </button>

                <button className="flex items-center bg-gray-600 bg-opacity-70 text-white px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-50 transition">
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
                {truncate(featuredMovie?.overview, 150)}
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Movie Rows */}
      <div className="relative -mt-40 space-y-5 pb-10">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Popular Movies" movies={popularMovies} />
        <MovieRow title="Top Rated" movies={topRatedMovies} />
        <MovieRow title="Action Thrillers" movies={actionMovies} />
        <MovieRow title="Comedies" movies={comedyMovies} />
        <MovieRow title="Horror Movies" movies={horrorMovies} />
      </div>
    </div>
  );
}

export default Movies;