// "use client";

// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { Connector, useAccount, useChainId, useConnect, useDisconnect } from 'wagmi'
// import CheckBalance from './CheckBalance';
// const ConnectWallet = () => {
//     const { connect, connectors } = useConnect()
//     const { disconnect } = useDisconnect()
//     const { isConnected, address } = useAccount()
//     const chainId = useChainId();
//     const router = useRouter();

//     if (isConnected) {
//         return (
//             <div className='flex flex-col gap-5'>
//                 <p>Connected to chainId {chainId} with address {address}</p>
//                 <CheckBalance account={address!} />
//                 <button
//                     className="w-fit px-10 text-center h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50"
//                     onClick={() => disconnect()}
//                     type="button"
//                 >
//                     Disconnect
//                 </button>
//             </div>
//         )
//     }

//     return (
//         <div className='flex flex-col gap-5 justify-center items-center w-full'>
//             {connectors.map((connector) => (
//                 <ConnectButton
//                     key={connector.uid}
//                     connector={connector}
//                     onClick={async () => {
//                         await connect({ connector, chainId });
//                         router.push('/');
//                     }}
//                 />
//             ))}
//         </div>
//     )
// }

// export default ConnectWallet

// function ConnectButton({
//     connector,
//     onClick,
// }: {
//     connector: any;
//     onClick: () => void;
// }) {
//     const [ready, setReady] = useState(false);

//     useEffect(() => {
//         (async () => {
//             const provider = await connector.getProvider();
//             setReady(!!provider);
//         })();
//     }, [connector]);

//     return (
//         <button
//             className="w-fit px-10 text-center h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50"
//             disabled={!ready}
//             onClick={onClick}
//             type="button"
//         >
//             Connect {connector.name}
//         </button>
//     );
// }


"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    Connector,
    useAccount,
    useChainId,
    useConnect,
    useDisconnect,
} from "wagmi";
import {
    Box,
    Button,
    Flex,
    Spinner,
    Text,
} from "@chakra-ui/react";

import { Toaster, toaster } from "@/components/ui/toaster";
import getBalance from "@/services/getBalance";

const ConnectWallet = () => {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { isConnected, address } = useAccount();
    const chainId = useChainId();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [balance, setBalance] = useState<string>("");

    const getCurrentBalance = async () => {
        const result = await getBalance(address?.toString());
        setBalance(result.toString());
    }

    useEffect(() => {
        if (isConnected) {
            getCurrentBalance();
        }
    }, [address]);

    if (isConnected) {
        return (
            <Flex direction="column" align="center" gap={6} p={6} bg="gray.300" borderRadius="lg">
                <Toaster />
                <Text fontSize="lg" fontWeight="bold" color="teal.600">
                    Connected to chainId {chainId} with address {address}
                </Text>
                <Box
                    p={4}
                    borderRadius="md"
                    bg="gray.50"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    maxW="sm"
                    mx="auto"
                >
                    {loading ? (
                        <Spinner size="lg" color="blue.500" />
                    ) : (
                        <>
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                Token Balance
                            </Text>
                            <Text fontSize="xl" color="blue.600" mt={2}>
                                {balance}
                            </Text>
                        </>
                    )}
                </Box>
                <Button
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: "blue.600" }}
                    _active={{ bg: "blue.700" }}
                    _focus={{ boxShadow: "outline" }}
                    onClick={() => {
                        disconnect();
                        toaster.create({
                            title: "Disconnected",
                            description: "You have disconnected your wallet.",
                        });
                    }}
                    mt={4}
                    size="lg"
                    borderRadius="md"
                    w="full"
                >
                    Disconnect
                </Button>
            </Flex >
        );
    }

    return (
        <Flex direction="column" align="center" gap={6} p={6} bg="gray.50" borderRadius="lg" boxShadow="lg">
            <Toaster />
            {connectors.map((connector) => (
                <ConnectButton
                    key={connector.uid}
                    connector={connector}
                    onClick={async () => {
                        await connect({ connector, chainId });
                        router.push('/');
                    }}
                />
            ))}
        </Flex>
    );
};

export default ConnectWallet;

function ConnectButton({
    connector,
    onClick,
}: {
    connector: Connector;
    onClick: () => void;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const provider = await connector.getProvider();
            setReady(!!provider);
        })();
    }, [connector]);

    return (
        <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            _focus={{ boxShadow: "outline" }}
            mt={4}
            size="lg"
            borderRadius="md"
            w="full"
            disabled={!ready}
            onClick={onClick}
            variant="solid"
        >
            Connect {connector.name}
        </Button>
    );
}

