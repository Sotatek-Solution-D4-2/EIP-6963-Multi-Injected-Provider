import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";

function App() {
  const [metaMaskProvider, setMetaMaskProvider] = useState(null);
  const [trustWalletProvider, setTrustWalletProvider] = useState(null);

  useEffect(() => {
    window.addEventListener("eip6963:announceProvider", (event: any) => {
      const provider = event.detail.provider;

      if (provider.isMetaMask) {
        setMetaMaskProvider(provider);
      }

      if (provider.isTrust) {
        setTrustWalletProvider(provider);
      }
    });

    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }, []);

  const isMetaMaskInstalled = !!metaMaskProvider;
  const isTrustWalletInstalled = !!trustWalletProvider;

  const handleConnectWallet = async (type: "METAMASK" | "TRUST_WALLET") => {
    const provider =
      type === "METAMASK" ? metaMaskProvider : trustWalletProvider;
    const web3provider = new Web3(provider as any);
    try {
      const accounts = await web3provider.eth.requestAccounts();
      console.log("ACCOUNTS", accounts);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {isMetaMaskInstalled && (
          <button onClick={() => handleConnectWallet("METAMASK")}>
            Metamask
          </button>
        )}
        {isTrustWalletInstalled && (
          <button onClick={() => handleConnectWallet("TRUST_WALLET")}>
            Trust wallet
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
