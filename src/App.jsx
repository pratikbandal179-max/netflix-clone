import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import TVShows from "./Pages/TVShows";
import Movies from "./Pages/Movies";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;