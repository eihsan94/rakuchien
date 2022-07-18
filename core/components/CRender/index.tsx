import {
    ListItem,
    Text,
    UnorderedList,
    Box,
    Heading,
    OrderedList,
} from '@chakra-ui/react'
import React, { FC, ReactNode, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';


import * as contentful from "contentful"

const client = contentful.createClient({
    space: 'w85dnx7mxo2r',
    accessToken: `${process.env.NEXT_PUBLIC_GQL_AUTH}`
})

export const getAssetURL = async (id: string) => "https:" + (await client.getAsset(id)).fields.file.url



interface Props {
    json: any
    children?: ReactNode
}

const CRender: FC<Props> = ({ json }) => {
    const [src, setSrc] = useState('')
    const options = {
        renderText: (text: any) => {
            return text.split('\n').reduce((children: any, textSegment: any, index: any) => {
                return [...children, index > 0 && <br key={index} />, textSegment];
            }, []);
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
                return <Text lineHeight={"200%"} fontSize={"lg"}>{children}</Text>
            },
            [BLOCKS.HEADING_1]: (node: any) => {
                return (
                    <Box mt="2em" mb="1em">
                        <Heading variant="h1">
                            {node.content[0].value}
                        </Heading>
                    </Box>
                )
            },
            [BLOCKS.HEADING_2]: (node: any) => {
                return (
                    <Box mt="2em" mb="1em">
                        <Heading variant="h2">
                            {node.content[0].value}
                        </Heading>
                    </Box>
                )
            },
            [BLOCKS.HEADING_3]: (node: any) => {
                return (
                    <Box mt="2em" mb="1em">
                        <Heading variant="h3" fontSize={"1.17em"} >
                            {node.content[0].value}
                        </Heading>
                    </Box>
                )
            },
            [BLOCKS.HEADING_4]: (node: any) => {
                return (
                    <Box mt="2em" mb="1em">
                        <Heading variant="h4" >
                            {node.content[0].value}
                        </Heading>
                    </Box>
                )
            },
            [BLOCKS.HEADING_5]: (node: any) => {
                return (
                    <Box mt="2em" mb="1em">
                        <Heading variant="h5">
                            {node.content[0].value}
                        </Heading>
                    </Box>
                )
            },
            [BLOCKS.HEADING_6]: (node: any) => {
                return (
                    <Box mt="2em" mb="1em">
                        <Heading variant="h6">
                            {node.content[0].value}
                        </Heading>
                    </Box>
                )
            },
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const { id } = node.data.target.sys;
                (async () => {
                    if (src) {
                        return
                    }
                    const url = await getAssetURL(id)
                    setSrc(url)
                })()
                return src ? <Image key={id} height="400px" width="400px" src={src} aria-label={src} /> : <></>
            },
            [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => <Text as={'a'} color="blue" href={node.data.uri} variant={"topDescription"}>{children}</Text>,
            [BLOCKS.UL_LIST]: (node: any, children: any) => (
                <UnorderedList>{children}</UnorderedList>
            ),
            [BLOCKS.OL_LIST]: (node: any, children: any) => (
                <OrderedList>{children}</OrderedList>
            ),
            [BLOCKS.LIST_ITEM]: (node: any, children: any) => <ListItem>{children}</ListItem>,
        }
    };
    return (
        <>
            {documentToReactComponents(json as any, options)}
        </>
    )
}

export default CRender 