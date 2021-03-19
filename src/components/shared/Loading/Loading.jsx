import React from "react";
import "./Loading.scss";

export const Loading = () => {
  return (
    <div class="loader">
      <svg class="circular-loader" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20"></circle>
      </svg>
    </div>
  );
};
