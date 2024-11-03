import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

interface ErrorPageProps {
  message?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const routeError = useRouteError();
  const navigate = useNavigate();

  let errorMessage = message || "Something went wrong. Please try again later.";

  if (!message && routeError) {
    if (typeof routeError === "string") {
      errorMessage = routeError;
    } else if (
      typeof routeError === "object" &&
      "status" in routeError &&
      "statusText" in routeError
    ) {
      errorMessage = `Error ${routeError.status}: ${routeError.statusText}`;
    } else if (typeof routeError === "object" && "message" in routeError) {
      errorMessage = routeError.message!.toString();
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="error-page" role="alert" aria-live="assertive">
      <div className="error-container">
        <h1>Oops!</h1>
        <p>{errorMessage}</p>
        <div className="error-buttons">
          <button onClick={handleGoBack}>Go Back</button>
          <button onClick={handleGoHome}>Go Home</button>
        </div>
      </div>
    </div>
  );
};
