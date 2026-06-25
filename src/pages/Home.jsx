import { useEffect, useState } from "react";
import { fetchCryptos } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";

const Home = () => {
  const [cryptoList, setcryptoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");

  // function for fetching data from the api
  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos();
      setcryptoList(data);
    } catch (err) {
      console.error("Error fetcting crypto: ", err);
    } finally {
      setisLoading(false);
    }
  };

  const filterAndSort = () => {
    let filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });

    setFilteredList(filtered);
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [sortBy, cryptoList, searchQuery]);

  return (
    <>
      <div className="app">
        <div className="header">
          <div className="header-content">
            <div className="logo-section">
              <h1> Crypto Tracker</h1>
              <p> Real time cryptocurrency prices and market data</p>
            </div>
            <div className="search-section">
              <input
                type="text"
                placeholder="search cryptos..."
                className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
        <div className="controls">
          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="market_cap_rank">Rank</option>
              <option value="name">Name</option>
              <option value="price">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="change">24h Change</option>
              <option value="market_cap">Market Cap</option>
            </select>
          </div>
          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>

            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              Lists
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="app">
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading crypto data....</p>
            </div>
          </div>
        ) : (
          <div className={`crypto-container ${viewMode}`}>
            {filteredList.map((crypto, key) => (
              <CryptoCard crypto={crypto} key={key} />
            ))}
          </div>
        )}
      </div>
      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
      </footer>
    </>
  );
};

export default Home;
