import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { SessionProvider } from 'next-auth/react';
import { getDefaultWallets, midnightTheme, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { injectedWallet, rainbowWallet, walletConnectWallet, ledgerWallet, metaMaskWallet, argentWallet, braveWallet, omniWallet, trustWallet, imTokenWallet } from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css'

const bscChain = {
  id: 56,
  name: 'BSC',
  network: 'bsc',
  iconUrl: '/images/bsc.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org',
  },
  blockExplorers: {
    default: { name: 'BSCScan', url: 'https://bscscan.com/' },
    etherscan: { name: 'BSCScan', url: 'https://bscscan.com/' },
  },
  testnet: false,
};

const bscTestnetChain = {
  id: 97,
  name: 'BSC Testnet',
  network: 'bsc-testnet',
  iconUrl: '/images/bsc.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s3.binance.org:8545',
  },
  blockExplorers: {
    default: { name: 'BSCScan', url: 'https://testnet.bscscan.com/' },
    etherscan: { name: 'BSCScan', url: 'https://testnet.bscscan.com/' },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [bscChain, bscTestnetChain],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      ledgerWallet({ chains }),
      braveWallet({ chains }),
      rainbowWallet({ chains }),
      argentWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
    ],
  }
]);

const client = createClient({
    provider,
    autoConnect: true,
    connectors,
});

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <RainbowKitProvider chains={chains} modalSize="compact" theme={midnightTheme()}>
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </SessionProvider>
        </WagmiConfig>
    );
}

export default MyApp;