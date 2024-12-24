import { Button, Text, Flex } from "@chakra-ui/react";
import { useAccount, useDisconnect } from "wagmi";
import {
    ClipboardIconButton,
    ClipboardInput,
    ClipboardLabel,
    ClipboardRoot,
} from "@/components/ui/clipboard";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "../ui/toaster";

export default function WalletConnected() {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 5)}.....${address.slice(-5)}`;
    };

    return (
        <Flex direction="row" align="center" gap={2}>
            <ClipboardRoot value={address || ""} maxW="150px">
                <InputGroup width="fit" endElement={<ClipboardIconButton />}>
                    <ClipboardInput fontSize="sm" value={shortenAddress(address || "")} readOnly />
                </InputGroup>
            </ClipboardRoot>

            <Button
                borderRadius="md"
                onClick={() => {
                    disconnect();
                    toaster.create({
                        title: "Disconnected Successfully.",
                        type: "info"
                    });
                }}
                _hover={{
                    boxShadow: "0px 4px 8px rgba(0, 0.2, 0, 0.1)",
                    bg: "red.600",
                }}
                className="font-normal px-5 py-2 rounded-full hover:-translate-y-[2px]"
                colorScheme="teal"
                size="sm"
                variant="outline"
                fontSize="xs"
                bg="red.500"
                padding='1'
                height="fit-content"
                paddingX="3"
                color="white"
            >
                Disconnect
            </Button>
        </Flex>
    );
}
