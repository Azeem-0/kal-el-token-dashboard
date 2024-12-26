"use client";
import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { sepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
})
