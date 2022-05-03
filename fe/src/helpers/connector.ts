import { UAuthConnector } from "@uauth/web3-react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import UAuth from "@uauth/js";
import { SUPPORTED_CHAINS } from "../constants";
import setting from "../setting";

export const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS });

export const walletconnect = new WalletConnectConnector({
  infuraId: process.env.REACT_APP_INFURA_ID!,
  qrcode: true,
});

export const uauth = new UAuthConnector({
  uauth: new UAuth({
    clientID: setting.UNSTOPPABLEDOMAIN_CLIENT_ID,
    scope: "openid email wallet",
    redirectUri: `${setting.APP_URL}/callback`,
  }),
  connectors: { injected, walletconnect },
});

console.log(`${setting.APP_URL}/callback`);
