import { useEffect, useState } from "react";

export default function TestError() {
  const [throwInRender, setThrowInRender] = useState(false);
  const [throwInEffect, setThrowInEffect] = useState(false);
  const [throwOnClick, setThrowOnClick] = useState(false);

  // Error in useEffect (runs after render)
  useEffect(() => {
    if (throwInEffect) {
      throw new Error("Error from useEffect!");
    }
  }, [throwInEffect]);

  // Error in render
  if (throwInRender) {
    throw new Error("Error from render!");
  }

  // Error on button click
  if (throwOnClick) {
    throw new Error("Error from button click!");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🧪 Test ErrorBoundary</h2>
      <p>Click buttons to simulate different errors:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => setThrowInRender(true)}>Throw error in render</button>
        <button onClick={() => setThrowInEffect(true)}>Throw error in useEffect</button>
        <button onClick={() => setThrowOnClick(true)}>Throw error on click</button>
      </div>
    </div>
  );
}