import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Header from '../src/components/Header';
import AdminLanding from './pages/AdminLanding';
import Rooms from '../src/pages/Rooms';


const httpLink = createHttpLink({
  uri: '/graphql',
});

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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
          <Route path='/home' element={<AdminLanding />} />
          <Route path='/rooms' element={<Rooms />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
