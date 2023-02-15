import "bootstrap/dist/css/bootstrap.min.css";
import ContactBox from "./components/ContactBox";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});
function App() {
    return (
        <ApolloProvider client={client}>
            <ContactBox />
        </ApolloProvider>
    );
}

export default App;
