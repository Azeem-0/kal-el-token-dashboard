import { toaster } from "../ui/toaster";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";

export default function PauseTokenOperations() {

    const { isPending, writeContractAsync } = useWriteContract();

    const handlePause = async () => {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'pause',
                args: [],
            });

            toaster.create({
                title: 'Success',
                description: 'The token paused successfully.',
                type: 'success',
                duration: 3000,
            });

        } catch (error) {
            toaster.create({
                title: 'Error',
                description: 'Failed to pause the token.',
                type: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <Button
            bg="red.600"
            colorScheme="blue"
            onClick={handlePause}
            loading={isPending}
            loadingText="Pausing..."
            width="fit-content"
            _hover={{ bg: 'blue.500' }}
            _active={{ bg: 'blue.700' }}
            borderRadius="md"
            fontSize="md"
            minW="5rem"
        >
            Pause
        </Button>
    );
}