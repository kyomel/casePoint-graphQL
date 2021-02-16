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
        todoById: async(root, { id }) => {
            const payload = await todo.findByPk(id, {
                include: todoitem
            });
            return payload;
        },
    },
    Mutation: {
        async registerUser(root, { username, email, password, role}){
            try {
                const payload = await user.create({
                    username,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    role
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
                console.log(findUser)
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
        },
        async updateTodo(root, { id, title, description }){
            try {
                const payload = await todo.update({
                        title,
                        description
                    }, {
                        where: {
                            id: id,
                        },
                })
                const resultPayload = await todo.findByPk(id);
                return resultPayload;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        async deleteTodo(root, { id }){
            try {
                const payload = await todo.destroy({
                    where: {
                        id: id,
                    }
                });
                const resultDelete = await todo.findByPk(id);
                return { resultDelete, message: "data successfull delete!!!"}
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
module.exports = resolvers;