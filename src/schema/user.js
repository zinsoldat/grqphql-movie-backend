const { gql, ApolloError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const typeDef = gql`
  type User {
    id: String
    name: String
  }
  " need to find a better name to fit both mutation responses "
  type CreateUserResponse {
    token: String
    user: User
  }
  
  type Mutation {
    createUser(
      username: String 
      password: String
    ): CreateUserResponse
    
    login(
      username: String 
      password: String
    ): CreateUserResponse
  }
`;

const resolvers = {
  Mutation: {
    async createUser(parent, args, context) {
      const user = {
        username: args.username,
        // hash password as soon as possible
        password: await hashPassword(args.password),
      };
      try {
        const createdUser = context.data.user.createUser(user);
        return { 
          token: createdUser.token, 
          user: { name: createdUser.username, id: createdUser.id},
        };
      } catch(error) {
        new ApolloError(error.message);
      }
    },
    
    async login(parent, args, context) {
      try {
        const user = context.data.user.getUser(args.username);
        const matches = await bcrypt.compare(args.password, user.password);
        if(matches) {
          return { 
            token: user.token, 
            user: { name: user.username, id: user.id},
          };
        }
      } catch(error) {
        new ApolloError(error.message);
      }
    }
  }
};

async function hashPassword(password) {  
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

module.exports = {
  typeDef,
  resolvers,
  hashPassword
};