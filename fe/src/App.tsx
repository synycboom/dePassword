import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PrivateFilePage from "./pages/PrivateFilePage";
import { uauth } from "./helpers/connector";

function App() {
  const navigate = useNavigate();
  const { account, activate } = useWeb3React();

  useEffect(() => {
    if (!account) navigate("/");
  }, [account, navigate]);

  useEffect(() => {
    uauth.uauth
      .user()
      .then((user: any) => {
        activate(uauth);
        console.log("User information:", user);
      })
      .catch(() => {
        const connected = window.localStorage.getItem("connected");
        if (connected) {
          activate(uauth);
        }
      });
  }, [activate]);

  return (
    <Routes>
      <Route path="/private-file" element={<PrivateFilePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
