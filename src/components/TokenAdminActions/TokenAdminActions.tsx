import { Flex } from "@chakra-ui/react";
import UnPauseTokenOperations from "./UnPauseTokenOperations";
import PauseTokenOperations from "./PauseTokenOperations";
import ChangeOwnership from "./ChangeOwnership";

export default function TokenAdminActions() {
    return <Flex direction="row" width="full" gap="3">
        <PauseTokenOperations />
        <UnPauseTokenOperations />
        <ChangeOwnership />
    </Flex>
};