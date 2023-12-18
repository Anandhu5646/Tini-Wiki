import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../../../BackgroundAnimation";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [searchInfo, setSearchInfo] = useState("");
  const [refresh, setRefresh]=useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.get(`/search/${searchTerm}`);
      setResult(response.data.query.search);
      setSearchInfo(response.data.query.searchinfo);
      localStorage.setItem("searchTerm", searchTerm);
    } catch (error) {
      console.log(error);
      console.error("Error in handleSearch", error);
    } 
  };
 
  const handleReadMore = (slug) => {
    navigate(`/read/${encodeURIComponent(slug)}`, { state: { searchTerm: searchTerm} });
  };
  const handleClearSearch = () => {
    setSearchTerm("");
  };
  return (
    <div>
      <header> 
        <div className="header">
          <h1>
            TINI<span>WIKI</span>
          </h1>
        </div>
        <form className="input" type="submit" onSubmit={handleSearch}>
          <input
            type="text"
            className="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-icon"
              onClick={handleClearSearch}
            >
              x
            </button>
          )}
        </form>

        {searchInfo.totalhits ? (
          <p className="search-number">
            Search Results: {searchInfo.totalhits}
          </p>
        ) : (
          ""
        )}
      </header>
      {result.map((res, i) => {
        return (
          <div className="results" key={i}>
            <div className="result">
              <h3>{res.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: res.snippet }}></p>
              <button
                onClick={() => handleReadMore(res.title)}
                className="readmore"
              >
                Read more
              </button>
            </div>
          </div>
        );
      })}
      <BackgroundAnimation />
    </div>
  );
}

export default SearchPage;
