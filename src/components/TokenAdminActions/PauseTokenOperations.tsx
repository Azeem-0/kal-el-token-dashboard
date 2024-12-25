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
        <Box
            p={3}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            maxW="md"
            mx="auto"
            mt={3}
            textAlign="center"
        >
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
                Pause Token
            </Text>
            <Button
                bg="red.600"
                colorScheme="blue"
                onClick={handlePause}
                loading={isPending}
                loadingText="Pausing"
                width="full"
                _hover={{ bg: 'blue.500' }}
                _active={{ bg: 'blue.700' }}
                mt={2}
                py={3}
                borderRadius="md"
                fontSize="md"
            >
                Pause Token
            </Button>
        </Box>
    );

}