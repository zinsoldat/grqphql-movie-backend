const uuid = require("uuid");
const crypto = require("crypto");
let users = [];

module.exports = {
  getUsers() {
    // return copy to avaid side effects
    return users.concat();
  },
  getUser(username) {
    const usersMatch = users.filter((u) => u.username === username);
    if (usersMatch.length !== 1) {
      throw Error("user does not exist");
    }
    return usersMatch[0];
  },
  getUserByToken(token) {
    const usersMatch = users.filter((u) => u.token === token);
    if (usersMatch.length !== 1) {
      throw Error("token already exists");
    }
    return usersMatch[0];
  },
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
      users.push(newUser);
      return newUser;
    }
    throw new Error(`user ${user.username} already exists`);
  },
  drop() {
    users = [];
  },

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
};