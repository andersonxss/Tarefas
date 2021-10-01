import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const token = "keyecw3Q5Zdt3I4JP";

const restLink = new RestLink({
  uri: "https://api.airtable.com/v0/appngsId1sTs0W4rC/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const client = new ApolloClient({
  link: ApolloLink.from([restLink]),
  cache: new InMemoryCache({
    typePolicies: {
      query: {
        fields: {
          tarefas: {
            merge() {},
          },
        },
      },
    },
  }),
});
