import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import Footer from '../components/base/footer'
import { ApolloProvider } from '@apollo/client'
import { graphqlClient } from '../utils/gqlClient'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

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
          <Footer />
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
