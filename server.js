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
    manager: {
      type: managerType,
      resolve: (team) => {
        return managers.find((manager) => manager.id === team.managerId);
      },
    },
  }),
});

const managerType = new GraphQLObjectType({
  name: "Manager",
  description: "managers' name",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    teams: {
      type: new GraphQLList(TeamType),
      resolve: (manager) => {
        return teams.filter((team) => team.managerId === manager.id);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    team: {
      type: TeamType,
      description: "query for every single team on each",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        return teams.find((team) => team.id === args.id);
      },
    },
    teams: {
      type: new GraphQLList(TeamType),
      description: "List of all teams",
      resolve: () => teams,
    },
    managers: {
      type: new GraphQLList(managerType),
      description: "List of all managers",
      resolve: () => managers,
    },
    manager: {
      type: new GraphQLList(managerType),
      description: "a query for a single manager",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) =>
        managers.find((manager) => manager.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addTeam: {
      type: TeamType,
      description: "add a team",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        managerId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const team = {
          id: teams.length + 1,
          name: args.name,
          managerId: args.managerId,
        };
        teams.push(team);
        return team;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(3000, () => console.log("server is running !!"));
