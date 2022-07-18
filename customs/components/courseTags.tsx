import { SpaceProps, HStack, Tag } from "@chakra-ui/react";


interface ICourseTags {
    tags: Array<string>;
    marginTop?: SpaceProps['marginTop'];
}


const CourseTags: React.FC<ICourseTags> = (props) => {
    return (
        <HStack spacing={2} marginTop={props.marginTop}>
            {props.tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                        {tag}
                    </Tag>
                );
            })}
        </HStack>
    );
};

export default CourseTags
