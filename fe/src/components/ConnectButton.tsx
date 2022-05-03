import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SUPPORTED_CHAINS } from "../constants";
import { formatAddress } from "../helpers";
import { uauth } from "../helpers/connector";
import metamaskIcon from "../images/metamask.png";
import udIcon from "../images/ud.png";
import { useState } from "react";

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINS,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  py: 2,
  px: 4,
};

const iconStyle = {
  width: 30,
  height: 30,
};

const ConnectButton = () => {
  const [open, setOpen] = useState(false);
  const { account, activate, deactivate } = useWeb3React();

  const connect = async () => {
    handleClose();
    try {
      window.localStorage.setItem("connected", "true");
      await activate(injected);
    } catch (ex) {
      console.error(ex);
    }
  };

  const disconnect = async () => {
    try {
      window.localStorage.removeItem("connected");
      console.debug("start logout: ");

      uauth.uauth
        .logout({
          beforeRedirect(url: string) {
            console.debug("start logout: ", url);
          },
        })
        .catch((error: any) => {
          console.error("profile error:", error);
        });
      deactivate();
    } catch (ex) {
      console.error(ex);
    }
  };

  const loginWithUD = () => {
    handleClose();
    activate(uauth);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2}>
            Connect to wallet
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<img style={iconStyle} src={metamaskIcon} alt="icon" />}
            onClick={connect}
          >
            Metamask
          </Button>
          <Box marginBottom={2} />
          <Button
            variant="outlined"
            fullWidth
            startIcon={<img style={iconStyle} src={udIcon} alt="icon" />}
            onClick={loginWithUD}
          >
            Login with Unstoppable
          </Button>
        </Box>
      </Modal>
      <Button variant="outlined" onClick={account ? disconnect : handleOpen}>
        {account ? `Disconnect ${formatAddress(account, 5)}` : "Connect Wallet"}
      </Button>
    </>
  );
};

export default ConnectButton;
