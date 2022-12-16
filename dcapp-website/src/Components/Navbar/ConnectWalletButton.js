import { useEffect, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'

import { Button } from '@mui/material'

function ConnectWalletButton() {
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