const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        username: String
        email: String
        password: String
        role: String
    }

    type Todo {
        user_id: Int
        title: String
        description: String
    }

    type TodoItem {
        todo_id: Int
        description: String
    }

    type UserLogin {
        username: String
        password: String
        token: String
    }

    type Query {
        hello: String
        users: [User]
        todos: [Todo]
        todoitems: [TodoItem]

    }

    type Mutation {
        registerUser(username:String!, email:String!, password:String!, role:String!): User
        loginUser(username:String!, password: String!): UserLogin
    }
`;
module.exports = typeDefs;