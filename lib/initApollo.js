import {ApolloClient} from 'apollo-client';
// import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';


const httpLink = createHttpLink({
    uri: 'http://localhost:8042/graphql',
});

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}


function create(initialState, { getToken }) {
    const token = getToken();
    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });


    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: true, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState,  { getToken }) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState,  { getToken })
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState,  { getToken })
    }

    return apolloClient
}


