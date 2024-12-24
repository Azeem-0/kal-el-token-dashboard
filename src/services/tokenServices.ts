"use client";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import client from "@/lib/viemClient";
import { useWriteContract } from "wagmi";
import { formatUnits, parseUnits } from "viem";


export const getBalance = async (address: string | undefined) => {
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
        // throw error;
        return 0;
    }
}


export const approveAllowance = async (spenderAddress: string, amount: string) => {
    if (!spenderAddress) return false;

    const { writeContract } = useWriteContract();

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
        // throw error;
        return false;
    }
}

export const transferOwnership = async (newOwner: string) => {
    if (!newOwner) return false;
    const { writeContract } = useWriteContract();
    try {
        await writeContract({
            address: CONTRACT_ADDRESS,
            abi: TOKEN_ABI,
            functionName: 'transferOwnership',
            args: [newOwner],
        });
        return true;
    } catch (error) {
        // throw error from here.
        console.log(error);
        return false;
    }
}