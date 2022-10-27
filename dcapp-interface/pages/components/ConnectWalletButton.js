import { ConnectButton } from '@rainbow-me/rainbowkit'
import { signIn, useSession } from 'next-auth/react'
import { useAccount, useSignMessage, useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function ConnectWalletButton() {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { status } = useSession()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

    useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain.id, network: 'evm' };

      const { data } = await axios.post('../api/auth/request-message', userData, {
        headers: {
          'content-type': 'application/json',
        },
      });

      const message = data.message;

      const signature = await signMessageAsync({ message });

    }
    if (status === 'unauthenticated' && isConnected) {
      handleAuth()
    }
  }, [status, isConnected])

  return (
    <>
      <ConnectButton />
    </>
  )
}

export default ConnectWalletButton