import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-10">
          <h2 className="text-red-500 text-lg">
            Something went wrong.
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;