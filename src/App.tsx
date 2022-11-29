import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { DashBoard } from "./views/Dashboard/Dashboard";
import { setContext } from '@apollo/client/link/context';
import { Profile } from "./views/profile/Profile";
import { Footer } from "./common/components/Footer/Footer";
import { NavBar } from "./common/components/NavBar/NavBar";




const link = from([
  new HttpLink({ uri: "https://tidily-server.vercel.app" })
])

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Lists: {
        keyFields: ["id", "listName"]
      }
    }
  }),
  link: authLink.concat(link)
})
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>;
    </ApolloProvider>
  )
}

export default App;
