
// import { useEffect, useState } from 'react';
// import { createPublicClient, http } from 'viem';
// import { CONTRACT_ADDRESS, TOKEN_ABI } from '../constants';
// import { sepolia } from 'viem/chains';
// import client from '@/lib/viemClient';
// import { useAccount } from 'wagmi';

// const CheckAllowance = () => {

//     const { address } = useAccount();

//     const [balance, setBalance] = useState<string>('0');
//     const [loading, setLoading] = useState<boolean>(false);

//     const [fromAddress, setFromAddress] = useState<string>("");
//     const [toAddress, setToAddress] = useState<string>("");

//     const checkAllowance = async () => {
//         if (fromAddress.trim() === '' || toAddress.trim() === '') {
//             alert("Enter from and to address");
//             return;
//         }

//         try {
//             const result: BigInt = await client.readContract({
//                 address: CONTRACT_ADDRESS,
//                 abi: TOKEN_ABI,
//                 functionName: 'allowance',
//                 args: [fromAddress, toAddress],
//             }) as BigInt;

//             setBalance(result.toString());

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
//                 <h1>Check Allowance..</h1>

//                 <input type="text" placeholder='Enter from address' onChange={(e) => setFromAddress(e.target.value)} />

//                 <input type="text" placeholder='Enter to address' onChange={(e) => setToAddress(e.target.value)} />

//                 <button onClick={checkAllowance}>Check</button>
//             </>
//             <p>{balance}</p>
//         </div>
//     );
// };

// export default CheckAllowance;

import { useState } from "react";
import client from "@/lib/viemClient";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "../constants";
import { Box, Flex, Input, Text, Spinner, Heading } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { readContract } from "viem/actions";
const CheckAllowance = () => {
    const [allowance, setAllowance] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(false);
    const [fromAddress, setFromAddress] = useState<string>("");
    const [toAddress, setToAddress] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const checkAllowance = async () => {
        if (fromAddress.trim() === "" || toAddress.trim() === "") {
            setError("Both from and to addresses are required.");
            toaster.create({
                title: "Error",
                description: "Both from and to addresses are required.",
                type: "info",
            });
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const result: BigInt = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'allowance',
                args: [fromAddress, toAddress],
            }) as BigInt;

            console.log(result);

            setAllowance(result.toString());

            toaster.create({
                title: "Allowance Checked",
                description: `Allowance: ${result.toString()}`,
                type: "success",
            });

        } catch (error) {
            console.error("Error fetching allowance:", error);
            setError("Failed to fetch allowance. Please try again.");
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
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Input
                    color="black"
                    placeholder="Enter to address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                {error && (
                    <Text color="red.500" fontSize="sm">
                        {error}
                    </Text>
                )}
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    onClick={checkAllowance}
                    loading={loading}
                    loadingText="Checking..."
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Check Allowance
                </Button>
                {loading && <Spinner size="sm" color="blue.500" mt={2} />}
                <Text fontWeight="bold" mt={4} color="gray.700">
                    Allowance: {allowance}
                </Text>
            </Flex>
        </Box>
    );
};

export default CheckAllowance;