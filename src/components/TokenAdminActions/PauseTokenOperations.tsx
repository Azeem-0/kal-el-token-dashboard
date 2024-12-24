import { useState } from "react";
import { toaster } from "../ui/toaster";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useTokenOperations } from "@/hooks/useTokenOperations";

export default function PauseTokenOperations() {

    const [isLoading, setIsLoading] = useState(false);
    const { pause } = useTokenOperations();

    const handlePause = async () => {
        setIsLoading(true);
        try {
            await pause();

            toaster.create({
                title: 'Token Paused',
                description: 'The token has been paused successfully.',
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
        } finally {
            setIsLoading(false);
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
                loading={isLoading}
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
            {isLoading && <Spinner size="sm" mt={3} color="blue.500" />}
            {!isLoading && (
                <Text color="blue.500" mt={2}>
                    Successfully paused the token.
                </Text>
            )}
        </Box>
    );

}