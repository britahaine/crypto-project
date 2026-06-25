import { useEffect, useState } from "react";
import { fetchCryptos } from "../api/coinGecko";

const Home = () => {
  const [cryptoList, setcryptoList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <>
      <div className="app">
        {isLoading ? (
          <>
            <div className="loading"></div>
            <div className="spinner"></div>
            <p>Loading crypto data....</p>
          </>
        ) : (
          <div className="crypto-container">
            {cryptoList.map((crypto, key) => (
              <CryptoCard />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
