import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import Button from "@mui/material/Button";
import { SUPPORTED_CHAINS } from "../constants";
import { formatAddress } from "../helpers";

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINS,
});

const ConnectButton = () => {
  const { account, activate, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.error(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.error(ex);
    }
  };
  return (
    <Button variant="outlined" onClick={account ? disconnect : connect}>
      {account ? `Disconnect ${formatAddress(account, 5)}` : "Connect Wallet"}
    </Button>
  );
};

export default ConnectButton;
