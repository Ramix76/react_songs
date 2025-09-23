import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home/Home";
import Songs from "../components/Songs/Songs";
import Hobbies from "../components/Hobbies/Hobbies";
import Contact from "../components/Contact/Contact";
import NotFound from "../components/Errors/NotFound";
import ApiPostCRUD from "../components/ApiPostCRUD/ApiPostCRUD";

export default function AppRouter() {
  return (
    <Router>
      <div>
        {/* Navigation Menu */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/home" style={{ marginRight: "15px" }}>🏠 Home</Link>
          <Link to="/canciones" style={{ marginRight: "15px" }}>🎵 Songs</Link>
          <Link to="/hobbies" style={{ marginRight: "15px" }}>🎯 Hobbies</Link>
          <Link to="/posts" style={{ marginRight: "15px" }}>📝 Posts</Link>
          <Link to="/contact" style={{ marginLeft: "18px" }}>✉️ Contact</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/canciones" element={<Songs />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/posts" element={<ApiPostCRUD />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}