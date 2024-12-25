import { useWriteContract } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import client from "@/lib/viemClient";

export const useTokenOperations = () => {
    const { writeContract } = useWriteContract();

    const checkBalance = async (address: string | undefined) => {
        if (!address) return 0;

        try {
            const result: bigint = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'balanceOf',
                args: [address],
            }) as bigint;

            return formatUnits(result, DECIMALS);
        } catch (error) {
            console.error("Error fetching balance:", error);
            return 0;
        }
    };

    const getOwner = async () => {
        try {
            const result: string = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "getOwner",
                args: [],
            }) as string;

            return result;
        } catch (error) {
            console.error("Error fetching balance:", error);
            return "null";
        }
    }
    const approveAllowance = async (spenderAddress: string, amount: string) => {
        if (!spenderAddress) return false;

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "approve",
                args: [spenderAddress, parseUnits(amount, DECIMALS)],
            });

            return true;
        } catch (error) {
            console.error("Error approving allowance : ", error);
            return false;
        }
    };

    const transferOwnership = async (newOwner: string) => {
        if (!newOwner) return false;

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'transferOwnership',
                args: [newOwner],
            });
            return true;
        } catch (error) {
            console.error("Error transferring ownership:", error);
            return false;
        }
    };

    const checkAllowance = async (owner: string, spender: string) => {
        try {
            const result: bigint = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'allowance',
                args: [owner, spender],
            }) as bigint;

            return formatUnits(result, DECIMALS);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const transfer = async (toAddress: string, amount: string) => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "transfer",
                args: [toAddress, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const transferFrom = async (fromAddress: string, toAddress: string, amount: string) => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "transferFrom",
                args: [fromAddress, toAddress, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const burn = async (fromAddress: string, amount: string) => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "burn",
                args: [fromAddress, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const mint = async (toAddress: string, amount: string) => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "mint",
                args: [toAddress, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const pause = async () => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'pause',
                args: [],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const unpause = async () => {
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'unpause',
                args: [],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return { getOwner, pause, unpause, mint, burn, transferFrom, transfer, checkBalance, approveAllowance, transferOwnership, checkAllowance };
};
