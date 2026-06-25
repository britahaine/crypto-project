import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CoinDetail } from "./pages/CoinDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/coin/:id" element={<CoinDetail />}></Route>
        </Routes>
        <footer className="footer">
          <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
