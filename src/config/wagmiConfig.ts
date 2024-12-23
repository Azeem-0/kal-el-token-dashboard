"use client";
import { createConfig, http } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})
