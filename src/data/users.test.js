const users = require("./users");

describe("users test", () => {
  let testUser;
  beforeEach(() => {
    users.drop();
    testUser = {username: "rene", password: "password1234"};
  });
  describe("getUsers", () => {
    it("should return all users", () => {
      const result = users.getUsers();
      expect(result.length).toEqual(0);
    });
  });
  
  describe("createUser", () => {
    it("should create a user if it does not already exist", () => {
      const usersBeforeCreate = users.getUsers();
      users.createUser(testUser);
      const result = users.getUsers();
      expect(result.length - 1).toEqual(usersBeforeCreate.length);
    });
    
    it("should not create a user with the same username twice", () => {
      users.createUser(testUser);
      try {
        users.createUser(testUser);
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
  
  describe("getUser", () => {
    it("should return an existing user", () => {
      users.createUser(testUser);
      const result = users.getUser(testUser.username);
      expect(result).toBe(testUser);
    });
    
    it("should throw an error if the user does not exist", () => {
      try {
        users.getUser(testUser.username);
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
});