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
      // user does not exist -> create the user
      return users.push(user);
    }
    throw new Error(`user ${user.username} already exists`);
  },
  drop() {
    users = [];
  },
};