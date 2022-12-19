import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContext'

import { Button } from '@mui/material'

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://matic-testnet-archive-rpc.bwarelabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"]
  },
  bsc: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "tBNB",
      decimals: 18
    },
    rpcUrls: ["https://data-seed-prebsc-2-s1.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"]
  }
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};


function ConnectWalletButton() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);


  const { user, setUser } = useContext(UserContext)


  async function connectWallet() {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      return false;
    }
  }

  return (
    <>
      <Button variant="contained" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </>
  )
}

export default ConnectWalletButton