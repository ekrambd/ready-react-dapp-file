import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './custom.css';
import Home from './components/Home';

const queryClient = new QueryClient();

const apiUrl = import.meta.env.VITE_API_URL;
const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: 'Crowfunding Dapps',
  description: 'Crowfunding project dapps',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [bsc];
const config = defaultWagmiConfig({ 
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
});


export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        
        <w3m-button/>
        
        <Home/>
      
        {/* <w3m-button/> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
