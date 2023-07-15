const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const teams = [
  { id: 1, name: "Manchester United", managerId: 1 },
  { id: 2, name: "Liverpool", managerId: 2 },
  { id: 3, name: "Manchester City", managerId: 3 },
  { id: 4, name: "Chelsea", managerId: 4 },
  { id: 5, name: "Arsenal", managerId: 5 },
  { id: 6, name: "Tottenham Hotspur", managerId: 6 },
  { id: 7, name: "Leicester City", managerId: 7 },
  { id: 8, name: "Everton", managerId: 8 },
  { id: 9, name: "West Ham United", managerId: 9 },
  { id: 10, name: "Leeds United", managerId: 10 },
];

const managers = [
  { id: 1, name: "Ole Gunnar Solskjær" },
  { id: 2, name: "Jurgen Klopp" },
  { id: 3, name: "Pep Guardiola" },
  { id: 4, name: "Thomas Tuchel" },
  { id: 5, name: "Mikel Arteta" },
  { id: 6, name: "Nuno Espirito Santo" },
  { id: 7, name: "Brendan Rodgers" },
  { id: 8, name: "Rafael Benitez" },
  { id: 9, name: "David Moyes" },
  { id: 10, name: "Marcelo Bielsa" },
];

const TeamType = new GraphQLObjectType({
  name: "Team",
  description: "PL teams",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    managerId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    teams: {
      type: new GraphQLList(TeamType),
      description: "List of all teams",
      resolve: () => teams,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(3000, () => console.log("server is running !!"));
