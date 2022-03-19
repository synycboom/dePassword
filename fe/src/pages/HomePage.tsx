import { styled } from "@mui/material/styles";
import ConnectButton from "../components/ConnectButton";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import password64 from "../images/password-64px.png";

const HomePageStyle = styled("div")(
  ({ theme }) => `
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: ${theme.spacing(4)};
  }
`
);

const HomePage = () => {
  const navigate = useNavigate();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      navigate("/dashboard");
    }
  }, [account, navigate]);

  return (
    <HomePageStyle>
      <Typography variant="h3" noWrap component="div" marginBottom={2}>
        <span style={{ color: "red" }}>De</span>Password
      </Typography>
      <Typography variant="h5" noWrap component="div" marginBottom={4}>
        Decentralized Password Management
      </Typography>
      <img className="logo" src={password64} alt="logo" />
      <ConnectButton />
    </HomePageStyle>
  );
};

export default HomePage;
