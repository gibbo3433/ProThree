import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './context/CartContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Basket from './pages/Basket';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Router>

          <Layout>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/basket"
                element={<Basket />}
              />
              <Route
                path="/me"
                element={<Home />}
              />
              <Route
                path="/profiles/:username"
                element={<Profile />}
              />
              <Route
                path="/category/:category"
                element={<ProductList />}
              />
              <Route
                path="/product/:productId"
                element={<Product />}
              />

            </Routes>
          </Layout>

        </Router>
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;
