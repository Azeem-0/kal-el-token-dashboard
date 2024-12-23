
// import { useState } from 'react';
// import { CONTRACT_ADDRESS, TOKEN_ABI } from '../constants';
// import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

// const TransferFromTokens = () => {

//     const [result, setResult] = useState<boolean>(false);

//     const { writeContract } = useWriteContract();

//     const { isPending } = useWaitForTransactionReceipt();


//     const [fromAddress, setFromAddress] = useState<string>("");
//     const [toAddress, setToAddress] = useState<string>("");
//     const [amount, setAmount] = useState<Number>();

//     const approveAllowance = async () => {
//         if (fromAddress.trim() === '' || toAddress.trim() === '') {
//             alert("Enter from & to address");
//             return;
//         }

//         try {
//             await writeContract({
//                 address: CONTRACT_ADDRESS,
//                 abi: TOKEN_ABI,
//                 functionName: 'transferFrom',
//                 args: [fromAddress, toAddress, amount],
//             });

//             setResult(true);

//         } catch (error) {
//             console.error('Error fetching balance:', error);
//         }
//     };

//     return (
//         <div>
//             <>
//                 <h1>TranserFrom Tokens..</h1>

//                 <input type="text" placeholder='Enter from address' onChange={(e) => setFromAddress(e.target.value)} />
//                 <input type="text" placeholder='Enter to address' onChange={(e) => setToAddress(e.target.value)} />
//                 <input type="number" placeholder='Enter amount' onChange={(e) => setAmount(Number.parseInt(e.target.value))} />

//                 <button onClick={approveAllowance}>Transfer</button>
//             </>

//             <p>{(isPending && result) && "Transferring.."}</p>
//             <p>{result && "Sucessfully transfered."}</p>
//         </div>
//     );
// };

// export default TransferFromTokens;

import { useState } from "react";
import { Box, Input, Text, Spinner, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "../constants";

const TransferFromTokens = () => {
    const [fromAddress, setFromAddress] = useState<string>("");
    const [toAddress, setToAddress] = useState<string>("");
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [result, setResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { writeContract } = useWriteContract();
    const { isPending } = useWaitForTransactionReceipt();

    const transferFromTokens = async () => {
        if (fromAddress.trim() === "" || toAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Error",
                description: "From address, to address, and amount are required.",
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
                functionName: "transferFrom",
                args: [fromAddress, toAddress, amount],
            });

            setResult(true);
            toaster.create({
                title: "Success",
                description: `Tokens successfully transferred from ${fromAddress} to ${toAddress} with amount ${amount}.`,
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error transferring tokens:", error);
            toaster.create({
                title: "Error",
                description: "Failed to transfer tokens. Please try again.",
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
                Transfer From Tokens
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
                    onClick={transferFromTokens}
                    // loading={isPending}
                    loadingText="Transferring"
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Transfer From Tokens
                </Button>
                {isPending && <Spinner size="sm" mt={3} color="blue.500" />}
                {result && !isPending && (
                    <Text color="green.500" mt={4}>
                        Successfully transferred tokens.
                    </Text>
                )}
            </Flex>
        </Box>
    );

};

export default TransferFromTokens;
