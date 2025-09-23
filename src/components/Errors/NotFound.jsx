export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Page not found 😅</p>
      <Link to="/home">Go back home</Link>
    </div>
  );
}