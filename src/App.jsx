import './App.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Event from './pages/Event';
import Artist from './pages/Artist';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        events: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // artists: {
        //   merge(existing, incoming) {
        //     return incoming;
        //   },
        },
      },
    },
  });

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache
  });
  
function App() {

  return (
    <>
     <div className="container-fluid bg bg-warning display ">
     <div className= "row w-75 mx-auto ">
      <ApolloProvider client={client}> 
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/:eventId" element={<Event />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
        </BrowserRouter>
        </ApolloProvider>
        </div>
      </div>
    </>
  )
}

export default App
