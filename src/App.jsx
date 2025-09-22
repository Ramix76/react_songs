import Hobbies from "./components/Hobbies";
import Songs from "./components/Songs";

export default function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Ferran</h1>
      <h2>Ramos</h2>

      <img
        src="https://via.placeholder.com/200"
        alt="Profile"
        width="200"
      />

      <p>
        Visit my favorite page 👉{" "}
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          Google
        </a>
      </p>

      <Hobbies />
      <Songs />
    </div>
  );
}