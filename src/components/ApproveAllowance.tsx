
import { useState } from "react";
import { Box, Input, Text, Spinner, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt } from "wagmi";
import { approveAllowance } from "@/services/tokenServices";

const ApproveAllowance = () => {
    const [spenderAddress, setSpenderAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const [result, setResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { isLoading, isPending } = useWaitForTransactionReceipt();

    const approve = async () => {
        if (spenderAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Error",
                description: "Both spender address and amount are required.",
                type: "info",
                duration: 3000,
            });
            return;
        }

        setLoading(true);

        try {
            const result = await approveAllowance(spenderAddress, amount);

            if (result) {
                setResult(true);
                toaster.create({
                    title: "Success",
                    description: `Allowance approved for ${spenderAddress} with amount ${amount}.`,
                    type: "success",
                    duration: 3000,
                });
            }
            else {
                toaster.create({
                    title: "Error",
                    description: "Failed to approve allowance. Please try again.",
                    type: "error",
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error("Error approving allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to approve allowance. Please try again.",
                type: "error",
                duration: 3000,
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
                Approve Allowance
            </Heading>
            <Flex direction="column" gap={4}>
                <Input
                    color="black"
                    placeholder="Enter spender address"
                    value={spenderAddress}
                    onChange={(e) => setSpenderAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Input
                    color="black"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    onClick={approve}
                    // loading={isLoading || isPending}
                    // loadingText="Approving"
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Approve Allowance
                </Button>
                {isPending && <Spinner size="sm" mt={3} color="blue.500" />}
                {result && !isPending && (
                    <Text color="green.500" mt={4}>
                        Successfully approved allowance.
                    </Text>
                )}
            </Flex>
        </Box>
    );

};

export default ApproveAllowance;
