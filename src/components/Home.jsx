import React, { useState, useEffect } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWriteContract } from 'wagmi';
import { bsc } from 'wagmi/chains';

const Home = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const abi = [
    {
        "constant": false,
        "inputs": [
            { "name": "to", "type": "address" },
            { "name": "value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

  const handleTransfer = async () => {
    try {
        // The amount should be specified in the smallest unit (wei)
        const amount = 0.01 * 10 ** 18; // For USDT, it's 1 * 10^18 to represent 1 USDT
        
        const data = await writeContractAsync({
            chainId: bsc.id, 
            address: '0x55d398326f99059fF775485246999027B3197955', // USDT BEP20 contract address
            functionName: 'transfer',
            abi: abi,
            args: [
                '0x4d2F6E73e744346c1B9046B8F931331e8a2F2805', // Recipient address
                amount, // Amount in wei
            ],
        });

        console.log('Transaction Data:', data);
    } catch (err) {
        console.error('Transaction Error:', err);
    }
};

  return (
    <>
    <button onClick={handleTransfer}>Transfer 1 USDT</button>
    </>
  );
};

export default Home;
