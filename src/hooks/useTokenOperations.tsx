import { formatUnits, parseUnits } from "viem";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import client from "@/lib/viemClient";

export const useTokenOperations = () => {

    const checkBalance = async (address: string | undefined) => {
        if (!address) return "";

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

    const getTokenName = async () => {
        try {
            const result: string = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "name",
                args: []
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }

    const getTotalSupply = async () => {
        try {
            const result: bigint = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "getTotalSupply",
                args: []
            }) as bigint;

            return formatUnits(result, DECIMALS);
        } catch (error) {
            throw error;
        }
    }

    const getTokenSymbol = async () => {
        try {
            const result: string = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "symbol",
                args: []
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }

    const getTokenDecimals = async () => {
        try {
            const result: string = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "getDecimals",
                args: []
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }

    const getStatus = async () => {
        try {
            const result: string = await client.readContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "status",
                args: []
            }) as string;

            return result;
        } catch (error) {
            throw error;
        }
    }
    return { getStatus, getTotalSupply, getTokenDecimals, getTokenSymbol, getTokenName, getOwner, checkBalance, checkAllowance };
};
