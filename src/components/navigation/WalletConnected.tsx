import { Button, Flex } from "@chakra-ui/react";
import { useAccount, useDisconnect } from "wagmi";
import {
    ClipboardIconButton,
    ClipboardInput,
    ClipboardRoot,
} from "@/components/ui/clipboard";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "../ui/toaster";

export default function WalletConnected() {
    const { address } = useAccount();
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
                onClick={() => {
                    disconnect();
                    toaster.create({
                        title: "Disconnected Successfully.",
                        type: "info"
                    });
                }}
                bg="red.500"
                height="fit-content"
                color="white"
                _hover={{
                    bg: "red.600",
                }}
                className=" font-semibold rounded-full"
                colorScheme="teal"
                size="sm"
                variant="outline"
                fontSize="sm"
                padding='2'
                paddingX="8"
            >
                Disconnect
            </Button>
        </Flex>
    );
}
