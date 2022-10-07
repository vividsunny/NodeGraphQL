var {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");
const students = require("../data/students.json");
const colleges = require("../data/colleges.json");

var StudentType = new GraphQLObjectType({
  name: "Students",
  description: "Represent College Students",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    collegeId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

var CollegeType = new GraphQLObjectType({
  name: "College",
  description: "Represents City Colleges",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    rating: { type: new GraphQLNonNull(GraphQLFloat) },
    students: {
      type: new GraphQLList(StudentType),
      resolve: (colleges) => {
        const stulist = students.filter((stu) => stu.collegeId === colleges.id);
        return stulist;
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    college: {
      type: CollegeType,
      description: "A Colleges",
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, args) =>
        colleges.find((collage) => collage.id === args.id),
    },
    colleges: {
      type: new GraphQLList(CollegeType),
      description: "List of All Colleges",
      resolve: () => colleges,
    },
    students: {
      type: new GraphQLList(StudentType),
      description: "List of All Students",
      resolve: () => students,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addCollege: {
      type: CollegeType,
      description: "Add a Book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLFloat },
      },
      resolve: (parent, args) => {
        const college = {
          id: `col-${100 + colleges.length}`,
          name: args.name,
          location: args.location,
          rating: args.rating,
        };
        colleges.push(college);
        return college;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
