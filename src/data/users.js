const uuid = require("uuid");
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
  createUser(user) {
    try {
      this.getUser(user.username);
    } catch(error) {
      // copy user to not change the `user` parameter
      const newUser = Object.assign({}, user);
      newUser.id = uuid.v4();
      // user does not exist -> create the user
      return users.push(newUser);
    }
    throw new Error(`user ${user.username} already exists`);
  },
  drop() {
    users = [];
  },
};