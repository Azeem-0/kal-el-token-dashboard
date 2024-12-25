
import { useState } from "react";
import { Box, Input, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";


const ApproveAllowance = () => {
    const [spender, setSpender] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const { isPending, writeContractAsync } = useWriteContract();

    const approve = async () => {
        if (spender.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "Both spender address and amount are required.",
                type: "info",
                duration: 2000,
            });
            return;
        }

        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "approve",
                args: [spender, parseUnits(amount, DECIMALS)],
            });

            toaster.create({
                title: "Success",
                description: "Allowance approved",
                type: "success",
                duration: 2000,
            });
        } catch (error) {
            console.error("Error approving allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to approve allowance. Please try again.",
                type: "error",
                duration: 2000,
            });
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
                    value={spender}
                    onChange={(e) => setSpender(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Input
                    color="black"
                    type="text"
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
                    loading={isPending}
                    loadingText="Approving..."
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Approve Allowance
                </Button>
            </Flex>
        </Box>
    );

};

export default ApproveAllowance;
