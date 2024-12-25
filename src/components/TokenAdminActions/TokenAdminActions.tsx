"use client";

import { Flex, Text } from "@chakra-ui/react";
import UnPauseTokenOperations from "./UnPauseTokenOperations";
import PauseTokenOperations from "./PauseTokenOperations";
import ChangeOwnership from "./ChangeOwnership";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useTokenOperations } from "@/hooks/useTokenOperations";
import { toaster } from "../ui/toaster";

export default function TokenAdminActions() {
    const { isConnected, address } = useAccount();

    const [isOwner, setIsOwner] = useState<boolean>(false);

    const { getOwner } = useTokenOperations();

    const checkTokenOwner = async () => {
        try {
            const result = await getOwner();
            if (address === result) {
                setIsOwner(true);
                return;
            }
        } catch (error) {
            console.error("Error fetching allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to fetch allowance. Please try again.",
                type: "error",
            });
        }
        setIsOwner(false);
    }

    useEffect(() => {
        checkTokenOwner();
    }, [isConnected]);


    return (
        <Flex
            direction="row"
            width="full"
            gap="3"
            align="center"
            justify="center"
            p={4}
            style={{
                filter: isOwner ? "none" : "blur(0.5px)",
                pointerEvents: isOwner ? "auto" : "none",
                opacity: isOwner ? "1" : "0.8",
            }}
        >
            <PauseTokenOperations />
            <UnPauseTokenOperations />
            <ChangeOwnership />
        </Flex>
    );


};