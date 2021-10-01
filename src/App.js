import React from "react";

import { ApolloProvider } from "@apollo/client";
import Home from "./view/Home";
import SignIn from "./view/SignIn";
import LoginContextProvider from "./context/LoginContext";
import { client } from "./config/cliente_graphql";
import TarefasContextProvider from "./context/TarefasContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <LoginContextProvider>
          <TarefasContextProvider>
            <Switch>
              <Route component={Home} exact path="/" />
              <Route component={SignIn} exact path="/Singin" />
            </Switch>
          </TarefasContextProvider>
        </LoginContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
