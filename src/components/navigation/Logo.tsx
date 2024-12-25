import { Flex, Highlight, Image, Text } from "@chakra-ui/react";

export default function Logo() {
    return (
        <Flex align="center" gap={3}>
            <Image
                src="https://imgs.search.brave.com/uNzxCqPxEgXuYDYthrTEkOyiWDChqrPygilIsDUwuB4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzlkL2Ji/LzhmLzlkYmI4ZjEw/OTM4OTA3YzdmMWY5/NzA2OTk4YTdiZjAy/LmpwZw" // Random placeholder image
                alt="Logo"
                boxSize="45px"
                rounded="full"
                objectFit="cover"
            />
            <h1 className="text-xl text-black h-fit font-bold">
                KAL-EL Token
            </h1>
        </Flex>
    );
}
