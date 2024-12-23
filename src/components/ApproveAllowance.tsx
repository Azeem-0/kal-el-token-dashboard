
// import { useEffect, useState } from 'react';
// import { createPublicClient, http } from 'viem';
// import { CONTRACT_ADDRESS, TOKEN_ABI } from '../constants';
// import { sepolia } from 'viem/chains';
// import client from '@/lib/viemClient';
// import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

// const ApproveAllowance = () => {

//     const { address } = useAccount();

//     const [result, setResult] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(false);

//     const { writeContract } = useWriteContract();

//     const { isLoading, isPending } = useWaitForTransactionReceipt();

//     const [spenderAddress, setSpenderAddress] = useState<string>("");
//     const [amount, setAmount] = useState<Number>();

//     const approveAllowance = async () => {
//         if (spenderAddress.trim() === '') {
//             alert("Enter from and to address");
//             return;
//         }

//         try {
//             await writeContract({
//                 address: CONTRACT_ADDRESS,
//                 abi: TOKEN_ABI,
//                 functionName: 'approve',
//                 args: [spenderAddress, amount],
//             });

//             setResult(true);

//         } catch (error) {
//             console.error('Error fetching balance:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <p>Loading Allowance...</p>;
//     }

//     return (
//         <div>
//             <>
//                 <h1>Approve Allowance..</h1>

//                 <input type="text" placeholder='Enter spender address' onChange={(e) => setSpenderAddress(e.target.value)} />
//                 <input type="number" placeholder='Enter amount' onChange={(e) => setAmount(Number.parseInt(e.target.value))} />

//                 <button onClick={approveAllowance}>Approve</button>
//             </>

//             <p>{(isPending && result) && "Approving.."}</p>
//             <p>{result && "Sucessfully approved"}</p>
//         </div>
//     );
// };

// export default ApproveAllowance;

import { useState } from "react";
import { Box, Input, Text, Spinner, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "../constants";

const ApproveAllowance = () => {
    const [spenderAddress, setSpenderAddress] = useState<string>("");
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [result, setResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { writeContract } = useWriteContract();
    const { isLoading, isPending } = useWaitForTransactionReceipt();

    const approveAllowance = async () => {
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
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "approve",
                args: [spenderAddress, amount],
            });

            setResult(true);
            toaster.create({
                title: "Success",
                description: `Allowance approved for ${spenderAddress} with amount ${amount}.`,
                type: "success",
                duration: 3000,
            });
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
                    onChange={(e) => setAmount(Number(e.target.value))}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    onClick={approveAllowance}
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
