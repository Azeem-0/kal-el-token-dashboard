import { toaster } from "../ui/toaster";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";
import { useEffect } from "react";

export default function UnPauseTokenOperations() {

    const { data: hash, isPending, writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isSuccess) {
            toaster.create({
                title: 'Token Unpaused',
                description: 'The token unpaused successfully.',
                type: 'success',
                duration: 2000,
            });
        }
    }, [isSuccess]);

    const loading = isPending || isConfirming;

    const handleUnpause = async () => {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'unpause',
                args: [],
            });

        } catch (error) {
            toaster.create({
                title: 'Error',
                description: 'Failed to unpause the token.',
                type: 'error',
                duration: 2000,
            });
        }
    };

    return (
        <Button
            bg="blue.600"
            colorScheme="blue"
            onClick={handleUnpause}
            loading={loading}
            loadingText="Unpausing"
            width="fit-content"
            _hover={{ bg: 'blue.500' }}
            _active={{ bg: 'blue.700' }}
            borderRadius="md"
            fontSize="md"
            minW="5rem"
        >
            Unpause
        </Button>
    );


}