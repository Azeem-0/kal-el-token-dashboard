"use client";
import { CONTRACT_ADDRESS, TOKEN_ABI } from "@/constants";
import client from "@/lib/viemClient";

const getBalance = async (address: string | undefined) => {
    const result: BigInt = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
    }) as BigInt;

    return result;
}
export default getBalance;