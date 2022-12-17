import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import NewDCATab from './Components/Body/Tabs/NewDCATab/NewDCATab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { UserContext } from './Context/UserContext';
import { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';
import PoolTab from './Components/Body/Tabs/PoolTab/PoolTab';

function App() {

  const [value, setValue] = useState('1');
  const { user, setUser } = useContext(UserContext);
  const [connected, setConnected] = useState(false);

  async function connectWallet() {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      return false;
    }
  }

  async function isMetaMaskConnected() {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  }

  async function initialise() {
    setConnected(await isMetaMaskConnected());
    if (!connected) {
      connectWallet();
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    setUser(await signer.getAddress());
    console.log("apptest", user)
  }

  async function checkUserAddress() {
    setConnected(await isMetaMaskConnected());
    if (connected) {
      console.log("connected");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      if (userAddress && userAddress !== user) {
        setUser(userAddress);
      }
    }
  }

  useEffect(() => {
    checkUserAddress();
    window.ethereum.on('accountsChanged', initialise);
    return () => {
      window.ethereum.removeListener('accountsChanged', initialise);
    }
  });

  return (
    <>
      <TabContext value={value}>
        <Navbar
          setTab={setValue}
        />
        <TabPanel value="1">
          <NewDCATab />
        </TabPanel>

        <TabPanel value="2">
        </TabPanel>

        <TabPanel value="3">
          <PoolTab />
        </TabPanel>

      </TabContext>
    </>
  )
}

export default App;