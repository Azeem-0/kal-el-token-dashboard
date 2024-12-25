import { formatUnits } from "viem";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import client from "@/lib/viemClient";

export const useTokenOperations = () => {

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
            throw error;
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
            throw error;
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

    return { getOwner, checkBalance, checkAllowance };
};
