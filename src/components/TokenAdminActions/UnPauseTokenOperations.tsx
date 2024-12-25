import { toaster } from "../ui/toaster";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";

export default function UnPauseTokenOperations() {

    const { isPending, writeContractAsync } = useWriteContract();

    const handleUnpause = async () => {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'unpause',
                args: [],
            });

            toaster.create({
                title: 'Token Unpaused',
                description: 'The token unpaused successfully.',
                type: 'success',
                duration: 2000,
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
        <Box
            p={3}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            maxW="md"
            mx="auto"
            mt={2}
            textAlign="center"
        >
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
                Unpause Token
            </Text>
            <Button
                bg="blue.600"
                colorScheme="blue"
                onClick={handleUnpause}
                loading={isPending}
                loadingText="Unpausing"
                width="full"
                _hover={{ bg: 'blue.500' }}
                _active={{ bg: 'blue.700' }}
                mt={2}
                py={2}
                borderRadius="md"
                fontSize="md"
            >
                Unpause Token
            </Button>
        </Box>
    );

}