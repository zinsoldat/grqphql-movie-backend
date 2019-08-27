const { AuthDirective } = require("./auth");
const contextMock = require("../../mocks/context.mock");
const directiveConfig = require("../../mocks/directiveConfig.mock");

describe("auth", () => {
  describe("AuthDirective", () => {
    let directive;
    
    beforeEach(() => {
      directive = new AuthDirective(directiveConfig.createDirectiveConfig());
    });
    
    it("should return field if user is authenticated", async () => {
      const context = contextMock.createContext();
      context.auth.user = { username: "test" };
      const testValue = "9.0";
      const resolveSpy = jest.fn(() => testValue);
      const field = { resolve: resolveSpy };
      directive.visitFieldDefinition(field);
      const result = await field.resolve(
        {}, // parent
        {}, // args
        context
      );
      
      expect(resolveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testValue);
    });

    it("should throw error if user is not authenticated", async () => {
      const context = contextMock.createContext();
      const resolveSpy = jest.fn(() => "fail");
      const field = { resolve: resolveSpy };
      try {
        directive.visitFieldDefinition(field);
        await field.resolve(
          {}, // parent
          {}, // args
          context
        );
        fail("should throw an error");
      } catch (error) {
        expect(error).toBeDefined();
        expect(resolveSpy).toHaveBeenCalledTimes(1);
      }
    });
  });
});