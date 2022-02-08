import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { graphqlClient } from '@utils/gqlClient'
import theme from 'customs/theme/theme'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={graphqlClient}>
        <ChakraProvider theme={theme}>
          <SWRConfig value={{
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}>
            <Component {...pageProps} />
          </SWRConfig>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
