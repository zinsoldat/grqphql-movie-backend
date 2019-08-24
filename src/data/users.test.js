const UsersData = require("./users");

describe("users test", () => {
  let usersData;
  let testUser;
  beforeEach(() => {
    usersData = new UsersData();
    testUser = {username: "rene", password: "password1234"};
  });
  describe("getUsers", () => {
    it("should return all users", () => {
      const result = usersData.getUsers();
      expect(result.length).toEqual(0);
    });
  });
  
  describe("getUsersByUsernames", () => {
    it("should return all users", () => {
      const users = usersData.getUsers();
      const result = usersData.getUsersByUsernames(users.map((user) => user.username));
      expect(result.length).toEqual(users.length);
      for(let i = 0; i < users.length; i++) {
        expect(result[i].name).toEqual(users[i].name);
        expect(result[i].birthday).toEqual(users[i].year);
      }
    });
    it("should return empty array if no users match", () => {
      const result = usersData.getUsersByUsernames([]);
      expect(result.length).toEqual(0);
    });
  });
  
  describe("getUsersByTokens", () => {
    it("should return all users", () => {
      const users = usersData.getUsers();
      const result = usersData.getUsersByTokens(users.map((user) => user.token));
      expect(result.length).toEqual(users.length);
      for(let i = 0; i < users.length; i++) {
        expect(result[i].id).toEqual(users[i].id);
        expect(result[i].token).toEqual(users[i].token);
        expect(result[i].name).toEqual(users[i].name);
        expect(result[i].birthday).toEqual(users[i].year);
      }
    });
    
    it("should return empty array if no users match", () => {
      const result = usersData.getUsersByTokens([]);
      expect(result.length).toEqual(0);
    });
  });
  
  describe("createUser", () => {
    it("should create a user if it does not already exist", () => {
      const usersBeforeCreate = usersData.getUsers();
      usersData.createUser(testUser);
      const result = usersData.getUsers();
      expect(result.length - 1).toEqual(usersBeforeCreate.length);
    });
    
    it("should not create a user with the same username twice", () => {
      usersData.createUser(testUser);
      try {
        usersData.createUser(testUser);
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
  
  describe("getUser", () => {
    it("should return an existing user", () => {
      usersData.createUser(testUser);
      const result = usersData.getUser(testUser.username);
      expect(result.username).toEqual(testUser.username);
      expect(result.password).toEqual(testUser.password);
      expect(result.id).toBeDefined();
    });
    
    it("should throw an error if the user does not exist", () => {
      try {
        usersData.getUser(testUser.username);
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
  
  describe("getUserByToken", () => {
    it("should return an existing user", () => {
      const createdUser = usersData.createUser(testUser);
      const result = usersData.getUserByToken(createdUser.token);
      
      expect(result.username).toEqual(createdUser.username);
    });
    
    it("should throw an error if the user does not exist", () => {
      try {
        usersData.getUser(usersData.createToken());
        fail("should have thrown an error");
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });
});