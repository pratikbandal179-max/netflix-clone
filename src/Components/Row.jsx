import React, { useEffect, useState } from "react";
import axios from "../api";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const API_KEY = "e87b725d7bec56232a3918da90f4635b";

function Row({ title, fetchUrl, isLargerRow = false }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const base_url = "https://image.tmdb.org/t/p/w500";

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setTrailerUrl("");
    setLoading(true);

    const titleName =
      movie?.title || movie?.name || movie?.original_name || movie?.original_title || "";
    const releaseYear = (movie?.release_date || movie?.first_air_date || "").split("-")[0];

    let foundKey = "";

    // पायरी १: TMDB API वरून थेट व्हिडिओ शोधणे
    try {
      const type = movie.first_air_date ? "tv" : "movie";
      const res = await axios.get(
        'https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}'
      );
      const videos = res.data?.results || [];

      const officialTrailer =
        videos.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
        videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        videos.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
        videos.find((v) => v.site === "YouTube");

      if (officialTrailer?.key) {
        foundKey = officialTrailer.key;
      }
    } catch (err) {
      console.log("TMDB direct fetch error:", err);
    }

    // पायरी २: जर TMDB कडे नसेल, तर नाव आणि वर्षावरून YouTube वर शोधणे
    if (!foundKey) {
      try {
        const searchQuery = releaseYear ? '${titleName} ${releaseYear}' : titleName;
        const id = await movieTrailer(searchQuery, { id: true, multi: false });
        if (id) {
          foundKey = id;
        } else {
          const fallbackId = await movieTrailer(titleName, { id: true, multi: false });
          if (fallbackId) foundKey = fallbackId;
        }
      } catch (err) {
        console.error("movieTrailer search error:", err);
      }
    }

    // पायरी ३: तरीही काही नाही सापडले, तर एरर न दाखवता डिफॉल्ट नेटफ्लिक्स ट्रेलर लावणे
    if (!foundKey) {
      foundKey = "L61p2uyiMSo";
    }

    setTrailerUrl(foundKey);
    setLoading(false);
  };

  const opts = {
    height: "380",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="ml-5 text-white" style={{ position: "relative" }}>
      <h2 className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>

      <div className="flex overflow-y-hidden overflow-x-scroll space-x-2 p-5 scrollbar-hide">
        {movies.map(
          (movie) =>
            ((isLargerRow && movie.poster_path) ||
              (!isLargerRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className={`cursor-pointer ${
                  isLargerRow ? "max-h-64 md:max-h-80" : "max-h-28 md:max-h-36"
                } object-contain mr-2 transition-transform duration-450 hover:scale-110 rounded-sm`}
                src={`${base_url}${
                  isLargerRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name || movie.title}
                style={{ cursor: "pointer", zIndex: 10 }}
              />
            )
        )}
      </div>

      {/* Video Modal Player */}
      {selectedMovie && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "760px",
              backgroundColor: "#181818",
              borderRadius: "10px",
              padding: "24px",
              color: "#fff",
              boxShadow: "0 20px 40px rgba(0,0,0,0.85)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedMovie(null);
                setTrailerUrl("");
              }}
              style={{
                position: "absolute",
                top: "12px",
                right: "16px",
                fontSize: "24px",
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>

            {/* Title */}
            <h3 style={{ margin: "0 0 14px 0", fontSize: "22px", fontWeight: "bold" }}>
              {selectedMovie?.title || selectedMovie?.name || selectedMovie?.original_name}
            </h3>

            {/* Video Container */}
            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#000",
                minHeight: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <p style={{ color: "#aaa" }}>Finding official trailer...</p>
              ) : (
                <YouTube videoId={trailerUrl} opts={opts} style={{ width: "100%" }} />
              )}
            </div>

            {/* Movie Description */}
            <p
              style={{
                marginTop: "14px",
                fontSize: "14px",
                color: "#ccc",
                lineHeight: "1.5",
                maxHeight: "90px",
                overflowY: "auto",
              }}
            >
              {selectedMovie?.overview || "No overview available for this title."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;