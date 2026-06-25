const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async () => {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    return response.json();

    if(!response.ok){
        throw new Error("Failed to fetch cryptos")
    }

    return response.jason();
};
