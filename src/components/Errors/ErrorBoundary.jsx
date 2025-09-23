import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Something went wrong 😅</h1>
          <p>{this.state.error?.message || "Try refreshing the page."}</p>
          {/* Simple link to reload the test page */}
          <a href="/test-error" style={{ marginTop: "20px", display: "inline-block" }}>
            🔄 Go back to Test Page
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}