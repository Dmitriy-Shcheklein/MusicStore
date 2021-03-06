import { GraphQLObjectType, GraphQLString,
  GraphQLSchema, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';

import { Users } from '../models/users.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return Users.findById(id)
      }
    },
    checkUserName: {
      type: new GraphQLList(UserType),
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, { name }) {
        return Users.find({ name: { $regex: new RegExp("^" + name + "$") } })
      }
    },
    checkUserEmail: {
      type: new GraphQLList(UserType),
      args: {
        email: { type: GraphQLString },
      },
      resolve(parent, { email }) {
        return Users.find({ email: { $regex: new RegExp("^" + email + "$") } })
      }
    },
    checkUserPassword: {
      type: new GraphQLList(UserType),
      args: {
        password: {type: GraphQLString},
      },
      resolve(parent, {password}) {
        return Users.find({password: { $regex: new RegExp("^" + password + "$") }})
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { name, email, password }) {
        const user = new Users({
          name,
          email,
          password,
        })
        return user.save()
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }) {
        return Users.findByIdAndRemove(id)
      }
    }
  }
})

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
