const uuid = require("uuid");
const crypto = require("crypto");

class UsersData {
  constructor() {
    this.users = [];
  }
  
  getUsers() {
    // return copy to avaid side effects
    return this.users.map((user => Object.assign({}, user)));
  }
  
  getUsersByUsernames(usernames) {
    return this.users.filter((user) => usernames.includes(user.username))
      .map((user => Object.assign({}, user)));
  }
  
  getUsersByTokens(tokens) {
    return this.users.filter((user) => tokens.includes(user.token))
      .map((user => Object.assign({}, user)));
  }
  
  getUser(username) {
    const usersMatch = this.users.filter((u) => u.username === username);
    if (usersMatch.length !== 1) {
      throw Error("user does not exist");
    }
    return Object.assign({}, usersMatch[0]);
  }
  
  getUserByToken(token) {
    const usersMatch = this.users.filter((u) => u.token === token);
    if (usersMatch.length !== 1) {
      throw Error("token already exists");
    }
    return Object.assign({}, usersMatch[0]);
  }
  
  createUser(user) {
    try {
      this.getUser(user.username);
    } catch(error) {
      // copy user to not change the `user` parameter
      const newUser = Object.assign({}, user);
      newUser.id = uuid.v4();
      // tokens are generated once in this implementation. They do not have an expire date
      newUser.token = this.createToken();
      // user does not exist -> create the user
      this.users.push(newUser);
      return newUser;
    }
    throw new Error(`user ${user.username} already exists`);
  }
  
  updateToken(username) {
    const usersMatch = this.users.filter((u) => u.username === username);
    if (usersMatch.length !== 1) {
      throw Error("user does not exist");
    }
    usersMatch[0].token = this.createToken();
    return Object.assign({}, usersMatch[0]);
  }
  
  createToken() {
    const token = crypto.randomBytes(30).toString("hex");
    // check if a token already exists. A token needs to be unique
    try {
      this.getUserByToken(token);
      // got a user with the token -> generate a new token
      return this.createToken();
    } catch (error) {
      // token does not exist -> valid token generated
      return token;
    }
  }
}

module.exports = UsersData;