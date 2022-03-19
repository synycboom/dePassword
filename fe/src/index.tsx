import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import App from "./App";
import "./index.css";

const POLLING_INTERVAL = 12000;

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Web3ReactProvider getLibrary={getLibrary}>
        <HashRouter>
          <App />
        </HashRouter>
      </Web3ReactProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
