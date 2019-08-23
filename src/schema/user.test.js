const user = require("./user");
const contextMock = require("../mocks/context.mock");

describe("user", () => {
  let testUser;
  beforeEach(() => {
    testUser = {username: "rene", password: "password1234"};
  });
  describe("resolvers", () => {
    describe("createUser", () => {
      const resolver = user.resolvers.Mutation.createUser;
      it("should create a user and return user with id and token", async () => {
        const contextMockObject = contextMock.createContext();
        const result = await resolver(
          {},
          testUser,
          contextMockObject,
        );
        const createdUser = contextMockObject.model.user.getUser(testUser.username);
        
        expect(result.token).toBeDefined();
        expect(result.user.id).toBeDefined();
        expect(result.user.name).toEqual(testUser.username);
        expect(createdUser.token).toEqual(result.token);
        expect(createdUser.id).toEqual(result.user.id);
        expect(createdUser.password).not.toEqual(testUser.password);
      });
    });
  });
});