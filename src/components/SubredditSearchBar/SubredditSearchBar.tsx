import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../../hooks/useInput";

interface SearchBarProps {
  onSearch: (subreddit: string) => void;
}

export const SubredditSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { subreddit } = useParams();
  const {
    value: inputValue,
    handleChange,
    handleKeyDown,
    reset,
  } = useInput("");
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(inputValue);
    reset();
  };

  return (
    <div className="search-bar">
      <div className="home-button">
        <button onClick={() => navigate("/")}>
          <i className="fa-solid fa-house"></i>
        </button>
      </div>
      <div className="search-input">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={`Search ${subreddit ? `r/${subreddit}` : "Reddit"}`}
          onKeyDown={(e) => handleKeyDown(e, handleSearch)}
        />
      </div>
    </div>
  );
};
