import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PrivateFilePage from "./pages/PrivateFilePage";

function App() {
  const navigate = useNavigate();
  const { account } = useWeb3React();

  useEffect(() => {
    if (!account) navigate("/");
  }, [account, navigate]);

  return (
    <Routes>
      <Route path="/private-file" element={<PrivateFilePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
