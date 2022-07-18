import { HStack, Image, Text } from "@chakra-ui/react";
import { Teacher } from "customs/types";




export const CourseAuthor: React.FC<Teacher> = (props) => {
    const { image, name } = props
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src={image?.url}
                alt={`${name}`}
            />
            <Text fontWeight="medium">{name}</Text>
        </HStack>
    );
};



export default CourseAuthor
