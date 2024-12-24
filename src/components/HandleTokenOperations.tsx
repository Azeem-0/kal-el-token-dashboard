// import React, { useState } from 'react';
// import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
// import { Button } from "@/components/ui/button";
// import { toaster } from "@/components/ui/toaster";
// import { useWriteContract } from 'wagmi';
// import { CONTRACT_ADDRESS, TOKEN_ABI } from '../constants';

// // function PauseTokenOperations() {

// //     const [isLoading, setIsLoading] = useState(false);
// //     const { writeContract } = useWriteContract();

// //     const handlePause = async () => {
// //         setIsLoading(true);
// //         try {
// //             await writeContract({
// //                 address: CONTRACT_ADDRESS,
// //                 abi: TOKEN_ABI,
// //                 functionName: 'pause',
// //                 args: [],
// //             });

// //             toaster.create({
// //                 title: 'Token Paused',
// //                 description: 'The token has been paused successfully.',
// //                 type: 'success',
// //                 duration: 3000,
// //             });
// //         } catch (error) {
// //             toaster.create({
// //                 title: 'Error',
// //                 description: 'Failed to pause the token.',
// //                 type: 'error',
// //                 duration: 3000,
// //             });
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <Box
// //             p={3}
// //             borderWidth={1}
// //             borderRadius="md"
// //             boxShadow="md"
// //             bg="white"
// //             maxW="md"
// //             mx="auto"
// //             mt={3}
// //             textAlign="center"
// //         >
// //             <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
// //                 Pause Token
// //             </Text>
// //             <Button
// //                 bg="blue.600"
// //                 colorScheme="blue"
// //                 onClick={handlePause}
// //                 loading={isLoading}
// //                 loadingText="Pausing"
// //                 width="full"
// //                 _hover={{ bg: 'blue.500' }}
// //                 _active={{ bg: 'blue.700' }}
// //                 mt={2}
// //                 py={3}
// //                 borderRadius="md"
// //                 fontSize="md"
// //             >
// //                 Pause Token
// //             </Button>
// //             {isLoading && <Spinner size="sm" mt={3} color="blue.500" />}
// //             {!isLoading && (
// //                 <Text color="blue.500" mt={2}>
// //                     Successfully paused the token.
// //                 </Text>
// //             )}
// //         </Box>
// //     );

// // }

// // function UnPauseTokenOperations() {
// //     const [isLoading, setIsLoading] = useState(false);
// //     const { writeContract } = useWriteContract();

// //     const handleUnpause = async () => {
// //         setIsLoading(true);
// //         try {
// //             await writeContract({
// //                 address: CONTRACT_ADDRESS,
// //                 abi: TOKEN_ABI,
// //                 functionName: 'unpause',
// //                 args: [],
// //             });

// //             toaster.create({
// //                 title: 'Token Unpaused',
// //                 description: 'The token has been unpaused successfully.',
// //                 type: 'success',
// //                 duration: 3000,
// //             });
// //         } catch (error) {
// //             toaster.create({
// //                 title: 'Error',
// //                 description: 'Failed to unpause the token.',
// //                 type: 'error',
// //                 duration: 3000,
// //             });
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <Box
// //             p={3}
// //             borderWidth={1}
// //             borderRadius="md"
// //             boxShadow="md"
// //             bg="white"
// //             maxW="md"
// //             mx="auto"
// //             mt={2}
// //             textAlign="center"
// //         >
// //             <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
// //                 Unpause Token
// //             </Text>
// //             <Button
// //                 bg="blue.600"
// //                 colorScheme="blue"
// //                 onClick={handleUnpause}
// //                 loading={isLoading}
// //                 loadingText="Unpausing"
// //                 width="full"
// //                 _hover={{ bg: 'blue.500' }}
// //                 _active={{ bg: 'blue.700' }}
// //                 mt={2}
// //                 py={2}
// //                 borderRadius="md"
// //                 fontSize="md"
// //             >
// //                 Unpause Token
// //             </Button>
// //             {isLoading && <Spinner size="sm" mt={2} color="blue.500" />}
// //             {!isLoading && (
// //                 <Text color="blue.500" mt={3}>
// //                     Successfully unpaused the token.
// //                 </Text>
// //             )}
// //         </Box>
// //     );

// // }

// export default function HandleTokenOperations() {
//     return (
//         <Flex
//             p={6}
//             maxW="lg"
//             mx="auto"
//             bg="white"
//             borderRadius="md"
//             boxShadow="md"
//             direction="column"
//         >
//             <PauseTokenOperations />
//             <UnPauseTokenOperations />
//         </Flex>
//     );
// }
