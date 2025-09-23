import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

// Components
import Home from "../components/features/Home/Home";
import Songs from "../components/features/Songs";
import Hobbies from "../components/features/Hobbies/Hobbies";
import Contact from "../components/features/Contact";
import Posts from "../components/features/Post";
import NotFound from "../components/Errors/NotFound";
import ErrorBoundary from "../components/Errors/ErrorBoundary";
import TestError from "../components/TestError";

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          {/* Navigation Menu */}
          <nav style={{ marginBottom: "20px" }}>
            <NavLink
              to="/home"
              style={({ isActive }) => ({ marginRight: "15px", fontWeight: isActive ? "bold" : "normal" })}
            >
              🏠 Home
            </NavLink>
            <NavLink
              to="/songs"
              style={({ isActive }) => ({ marginRight: "15px", fontWeight: isActive ? "bold" : "normal" })}
            >
              🎵 Songs
            </NavLink>
            <NavLink
              to="/hobbies"
              style={({ isActive }) => ({ marginRight: "15px", fontWeight: isActive ? "bold" : "normal" })}
            >
              🎯 Hobbies
            </NavLink>
            <NavLink
              to="/posts"
              style={({ isActive }) => ({ marginRight: "15px", fontWeight: isActive ? "bold" : "normal" })}
            >
              📝 Posts
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({ marginRight: "15px", fontWeight: isActive ? "bold" : "normal" })}
            >
              ✉️ Contact
            </NavLink>
            <NavLink
              to="/test-error"
              style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
            >
              🧪 Test
            </NavLink>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/hobbies" element={<Hobbies />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test-error" element={<TestError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}