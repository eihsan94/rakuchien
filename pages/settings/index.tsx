import { Box, Button, Select, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Layout from '../../customs/components/base/layout'
import { useI18n } from '../../core/hooks/useI18n'
import { useLocales } from '../../core/hooks/useLocales'
import { redirectTo } from '@utils/ssrAuth'
import DarkModeBtn from '@components/Buttons/darkMode'

interface Props { }

function Index(props: Props) {
    const { locale, translate } = useI18n()
    const { locales, handleLocale } = useLocales()
    const { data: session } = useSession()
    const contents = [
        {
            title: translate("LANGUAGE_LABEL"),
            content:
                <>
                    {locales &&
                        <Select w={{ base: "100%", md: "fit-content" }} value={locale} onChange={(e) => handleLocale(e.target.value)}>
                            {locales.map((e) => (
                                <option
                                    key={e}
                                    value={e}
                                    label={translate('LANGUAGE', e)}
                                />
                            ))}
                        </Select>
                    }
                </>
        },
        {
            title: translate("DARK_MODE_LABEL"),
            content: <DarkModeBtn />
        },
        {
            title: translate("AUTH_LABEL"),
            content:
                <Button onClick={() => signOut({ callbackUrl: "/lessons" })}>
                    Sign Out
                </Button>
        },
    ]
    return (
        <Layout title={translate('SETTING_PAGE_TITLE')} description={`Welcome back ${session?.user?.name}`}>
            <Box w="100%">
                {
                    contents.map((c, i) =>
                        <Box key={i} w="100%" py={{ base: "1em", md: "2em" }}>
                            <Text variant='h3' mb={{ base: ".5em", md: "1em" }}>
                                {c.title}
                            </Text>
                            {c.content}
                        </Box>
                    )
                }
            </Box>
        </Layout>
    )
}

export default Index


export const getServerSideProps: GetServerSideProps = async (context) => {
    return redirectTo(context)
};