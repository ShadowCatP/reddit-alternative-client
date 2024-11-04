import { SubredditSearchBar } from "../SubredditSearchBar/SubredditSearchBar.tsx";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleSubredditSearch = (subreddit: string) => {
    navigate(`/sub/${subreddit}`);
  };

  return (
    <div className="app-layout">
      <SubredditSearchBar onSearch={handleSubredditSearch} />
      <div className="main-content" style={{ marginTop: "79.5px" }}>
        <Outlet />
      </div>
    </div>
  );
};
