"use client";

import { Button } from "@/components/ui/button";
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { useConnect, Connector, useChainId, useAccount } from "wagmi";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ConnectionDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { connect, connectors } = useConnect();
    const chainId = useChainId();
    const { isConnected } = useAccount();


    useEffect(() => {
        if (isConnected) {
            setIsDrawerOpen(false);
        }
    }, [isConnected]);

    const router = useRouter();

    return (
        <DrawerRoot open={isDrawerOpen}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button
                    _hover={{
                        boxShadow: "0px 4px 8px rgba(0, 0.2, 0, 0.1)",
                        bg: "#D6D6DB",
                    }}
                    onClick={() => {
                        setIsDrawerOpen(true);
                    }}
                    className="bg-[#d8d8d9] font-normal rounded-full hover:-translate-y-[2px] hover:bg-[#D6D6DB]"
                    colorScheme="teal"
                    size="sm"
                    borderRadius="md"
                    variant="outline"
                    fontSize="xs"
                    padding='1'
                    height="fit-content"
                    paddingX="3"
                    color="black"
                >
                    Connect
                </Button>
            </DrawerTrigger>

            <DrawerContent offset="4" rounded="md" bg="gray.50">
                <DrawerHeader>
                    <DrawerTitle fontSize="lg" fontWeight="medium" color="gray.800">
                        Select Wallet
                    </DrawerTitle>
                </DrawerHeader>

                <DrawerBody display="flex" flexDirection="column" gap={5}>
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
                </DrawerBody>

                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline" color="gray.800">
                            Close
                        </Button>
                    </DrawerActionTrigger>
                </DrawerFooter>

                <DrawerCloseTrigger color="black" />
            </DrawerContent>
        </DrawerRoot >
    );
};

export default ConnectionDrawer;

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
        <Flex key={connector.id} align="center" justify="space-between" padding="2" border="1px solid gray" rounded="sm">
            <Text
                fontSize="md"
                fontWeight="normal"
                color="gray.900"
            >
                {connector.name}
            </Text>
            <Spacer />
            <Button
                borderRadius="md"
                disabled={!ready}
                onClick={onClick}
                key={connector.uid}
                colorScheme="blue"
                variant="outline"
                fontSize="xs"
                bg="black"
                padding='1'
                height="fit-content"
                paddingX="3"
                color="white"
                loadingText="Connecting"
            >
                Connect
            </Button>
        </Flex>
    );
}
