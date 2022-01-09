import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
  } from "@apollo/client";
  import { setContext } from '@apollo/client/link/context';
  
  const httpLink = createHttpLink({
    uri: "https://graphql.contentful.com/content/v1/spaces/ua7xapvxd4ui", fetch
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer BuNADmEmMXyXSGIjeNGGKsRbA0SW20_OygkamQpIupI`
      }
    }
  });
  
  
  export const graphqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });