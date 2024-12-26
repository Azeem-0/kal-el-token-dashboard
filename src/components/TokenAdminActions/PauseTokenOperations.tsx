import { toaster } from "../ui/toaster";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";
import { useEffect } from "react";

export default function PauseTokenOperations() {

    const { data: hash, isPending, writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isSuccess) {
            toaster.create({
                title: 'Success',
                description: 'The token paused successfully.',
                type: 'success',
                duration: 3000,
            });
        }
    }, [isSuccess]);

    const loading = isPending || isConfirming;

    const handlePause = async () => {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'pause',
                args: [],
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
            loading={loading}
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