var {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");
const db = require("../../routes/sqldb");

var tabledata = [];

function getUser() {
  const sql = "SELECT * FROM myproject.user";
  db.query(sql, (err, result) => {
    if (result.length > 0 && err == null) {
      tabledata = result;
    }
  });
}

function createUser(args) {
  const sql = "INSERT INTO myproject.user SET ?";
  db.query(sql, args, (err) => {
    if (err) {
      throw err;
    }
  });
}

function updateUser(args) {
  console.log(args);
  const sql = "UPDATE myproject.user SET ? WHERE id=" + args.id;
  var details = {
    name: args.name,
    email: args.email,
    password: args.password,
  };
  db.query(sql, details, (err) => {
    if (err) {
      throw err;
    }
  });
}

var UsersType = new GraphQLObjectType({
  name: "Users",
  description: "Represent Users",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

var RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    user: {
      type: UsersType,
      description: "All Users",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => tabledata.find((user) => user.id === args.id),
    },
    users: {
      type: new GraphQLList(UsersType),
      description: "List of All User",
      resolve: () => tabledata,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addUser: {
      type: UsersType,
      description: "Add a User",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        createUser(args);
        getUser();
      },
    },
    updateUser: {
      type: UsersType,
      description: "Update a User",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        updateUser(args);
        getUser();
      },
    },
  }),
});

getUser();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
