import { useState } from "react";
import { Box, Flex, Input, Text, Spinner, Heading } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useTokenOperations } from "@/hooks/useTokenOperations";


const CheckAllowance = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [owner, setOwner] = useState<string>("");
    const [spender, setSpender] = useState<string>("");
    const [amount, setAmount] = useState<string>("0");

    const { checkAllowance } = useTokenOperations();

    const allowance = async () => {
        if (owner.trim() === "" || spender.trim() === "") {
            toaster.create({
                title: "Warning",
                description: "Both owner and spender wallet address is required.",
                type: "info",
            });
            return;
        }

        setLoading(true);

        try {
            const result = await checkAllowance(owner, spender);

            setAmount(result.toString());

            toaster.create({
                title: "Success",
                description: "Checked allowance successfully.",
                type: "success",
            });
        } catch (error) {
            console.error("Error fetching allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to fetch allowance. Please try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            p={6}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            maxW="md"
            mx="auto"
            mt={6}
        >
            <Heading size="md" mb={4} color="gray.800">
                Check Allowance
            </Heading>
            <Flex direction="column" gap={4}>
                <Input
                    color="black"
                    placeholder="Enter from address"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Input
                    color="black"
                    placeholder="Enter to address"
                    value={spender}
                    onChange={(e) => setSpender(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    onClick={allowance}
                    loading={loading}
                    loadingText="Checking..."
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Check Allowance
                </Button>
                <Text fontWeight="semibold" mt={4} color="gray.700">
                    Allowance: {amount} KET
                </Text>
            </Flex>
        </Box>
    );
};

export default CheckAllowance;