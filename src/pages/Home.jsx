import { useEffect, useState } from "react";
import { fetchCryptos } from "../api/coinGecko";

const Home = () => {
  const [cryptoList, setcryptoList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
      <div className="app"></div>
    </>
  );
};

export default Home;
