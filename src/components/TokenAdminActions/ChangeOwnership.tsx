import { useState } from "react";
import { toaster } from "../ui/toaster";
import { Box, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { transferOwnership } from "@/services/tokenServices";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";

export default function ChangeOwnership() {

    const [isLoading, setIsLoading] = useState(false);
    const [newOwner, setNewOwner] = useState<string>("");
    const { writeContract } = useWriteContract();

    const changeOwnerShip = async () => {
        setIsLoading(true);
        try {
            // await transferOwnership(newOwner);
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'transferOwnership',
                args: [newOwner],
            });

            toaster.create({
                title: 'Token Paused',
                description: 'The token has been paused successfully.',
                type: 'success',
                duration: 3000,
            });
        } catch (error) {
            toaster.create({
                title: 'Error',
                description: 'Failed to tranfer ownership.',
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
            <Flex direction="column" gap={4}>
                <Heading size="md" mb={4} color="gray.800">
                    Change Ownership
                </Heading>
                <Input
                    color="black"
                    placeholder="Enter address"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    onClick={changeOwnerShip}
                    // loading={isPending}
                    loadingText="Minting"
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Tranfer Ownership
                </Button>
            </Flex>
        </Box>
    );

}