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
import { useTokenOperations } from "@/hooks/useTokenOperations";

const ConnectWallet = () => {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { isConnected, address } = useAccount();
    const chainId = useChainId();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [balance, setBalance] = useState<string>("");

    const { checkBalance } = useTokenOperations();

    const getCurrentBalance = async () => {
        try {
            const result = await checkBalance(address?.toString());
            setBalance(result.toString());
        }
        catch (err) {
            console.log(err);
        }
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

