require('dotenv').config();
const bcrypt = require('bcrypt');
const token = require('../helper/token');
const { user, todo, todoitem } = require('../db/models');
const console = require('console');
const resolvers = { 
    Query: {
        hello: () => "Hei You!",
        users: () => user.findAll(),
        todos: () => todo.findAll(),
        todoitems: () => todoitem.findAll(),
    },
    Mutation: {
        async registerUser(root, { username, email, password, role}){
            try {
                const payload = await user.create({
                    username,
                    email,
                    password: await bcrypt.hash(password, 10),
                    role:'user'
                })
                return payload;
            } catch (err) {
                console.log(err);
            }
        },
        async loginUser(_, { username, password }){
            try {
                const findUser = await user.findOne({
                    where: {
                        username
                    }
                });
                if (!findUser) {
                    throw new Error("Opps user they don't have registered!!!!");
                }
                const isValid = await bcrypt.compareSync(password, findUser.password);
                if (!isValid) {
                    throw new Error("Incorrect password!!!");
                }
                const getToken = await token(findUser);
                return { token: getToken, findUser}
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
module.exports = resolvers;