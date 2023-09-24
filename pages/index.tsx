import Image from 'next/image'
// import map from '../public/map.svg'
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Layout } from '@vercel/examples-ui'
import React, { useState, useEffect } from 'react';

// Get friend token address
async function getFriendTokenAddress() {
  return "0xdummy_address"
  // TODO
  const response = await fetch('https://api.yourtokenplatform.com/friendtokenaddress');
  const data = await response.json();
  return data.address
}

// Get Friend Value
export async function getFriendValue(address) {
  return 1.9999
  // TODO
  const response = await fetch(`https://api.yourtokenplatform.com/tokenValue?address=${address}`);
  const data = await response.json();
  return data.value;
}

// Get scroll value
export async function getScrollValue(address) {
  return 1.1231245

  // TODO
  const response = await fetch(`https://api.yourtokenplatform.com/tokenValue?tokenType=scroll&address=${address}`);
  const data = await response.json();
  return data.value;
}

// Define exchange rates
const initialFriendToScroll = 0.5; // Example exchange rate: 1 friend token = 0.5 scroll tokens
const initialScrollToFriend = 2; // Example exchange rate: 1 scroll token = 2 friend tokens
const initialAddr = "vitalik.eth"


export default function Index() {
  const [youPay, setYouPay] = useState('');
  const [youReceive, setYouReceive] = useState('');
  const [friendToScroll, setFriendToScroll] = useState(initialFriendToScroll);
  const [scrollToFriend, setScrollToFriend] = useState(initialScrollToFriend);
  const [friendAddress, setFriendAddress] = useState(initialAddr)

  useEffect(() => {
    // Fetch exchange rates when the component mounts
    async function fetchData() {
      try {
        const friendTokenValue = await getFriendValue(friendAddress);
        const scrollTokenValue = await getScrollValue(friendAddress)
        // const friendAddress = await getFriendTokenAddress(friendAddress);
        console.log(`Friend Token Value: ${friendTokenValue}`);
        console.log(`Scroll Token Value: ${scrollTokenValue}`);
        setFriendToScroll(friendTokenValue);
        setScrollToFriend(scrollTokenValue);
      } catch (error) {
        console.error(`Error fetching exchange rates: ${error}`);
      }
    }

    fetchData();
  }, []);

  const handleAddr = (event) => {
    console.log('received')
  }

  const handleYouReceive = (event) => {
    let value = event.target.value;
    // Replace any non-digit characters except a single decimal point.
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1');
    event.target.value = value;
  
    setYouPay(value);

    if (!isNaN(value) && scrollToFriend !== null) {
      const multipliedValue = parseFloat(value) * scrollToFriend;
      setYouReceive(multipliedValue.toFixed(7));
      console.log(`You receive: ${multipliedValue.toFixed(7)}`)
    } else {
      setYouReceive('');
    }
  };


  const handleYouPayChange = (event) => {
    let value = event.target.value;
    // Replace any non-digit characters except a single decimal point.
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1');
    event.target.value = value;
  
    setYouPay(value);

    if (!isNaN(value) && friendToScroll !== null) {
      const multipliedValue = parseFloat(value) * friendToScroll;
      setYouReceive(multipliedValue.toFixed(7));
      console.log(`You receive: ${multipliedValue.toFixed(7)}`)
    } else {
      setYouReceive('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-50">
      {/* <WagmiConfig>
        <ConnectButton />
      </WagmiConfig> */}
      <div className="fixed inset-0 overflow-hidden opacity-75 bg-[#f8fafb]">
        {/* <Image alt="World Map" src={map} fill={true} quality={100} /> */}
      </div>
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center z-10 pt-8 sm:pt-20 w-800 h-800">
        <h1 className="text-3xl sm:text-5xl font-bold">KeySwap</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700">
        your network is your net worth
        </p>
        <section className="border border-gray bg-white rounded-lg shadow-lg mt-16 w-full hover:shadow-2xl transition">
        <div className="p-10
         flex justify-center items-between border-b bg-gray-50">
          <h4 className="font-semibold text-left mr-auto">Enter Address</h4>
          <div className="flex items-center">
            <input 
              type="text"
              className="border border-gray-300 rounded-md px-5 py-5 text-gray-700"
              onSubmit={handleAddr}
              title="Enter Address"
            />
          </div>
        </div>
        <div className="p-10
         flex justify-center items-between border-b bg-gray-50">
          <h4 className="font-semibold text-left mr-auto">You Pay</h4>
          <div className="flex items-center">
            <input 
              type="text"
              value={youPay} 
              className="border border-gray-300 rounded-md px-5 py-5 text-gray-700"
              onChange={handleYouPayChange}
              pattern="\d*\.?\d*"
              title="you pay"
            />
          </div>
        </div>
        <div className="p-10 flex justify-center items-between border-b bg-gray-50">
          <h4 className="font-semibold text-left mr-auto">You Receive</h4>
          <input 
            type="text"  
            value={youReceive}
            className="border border-gray-300 rounded-md px-5 py-5 text-gray-700"
            onChange={handleYouReceive}
            pattern="\d*\.?\d*"
            title="you receive"
          />
        </div>
        <div className="p-10 flex justify-center items-between border-b bg-gray-50">
          <button>Connect Wallet</button>
        </div>
        </section>
      </main>
    </div>
  )
}

Index.Layout = Layout
