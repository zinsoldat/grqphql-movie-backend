const { DateDirective } = require("./dateFormat");
const contextMock = require("../../mocks/context.mock");
const directiveConfig = require("../../mocks/directiveConfig.mock");

describe("date", () => {
  describe("DateDirective", () => {
    let directive;
    
    beforeEach(() => {
      const config = directiveConfig.createDirectiveConfig();
      config.args.defaultFormat = "dd.mm.yyyy";
      directive = new DateDirective(config);
    });
    
    it("should return formatted according to default format", async () => {
      const context = contextMock.createContext();
      const testValue = new Date(2012, 11, 10).toISOString();
      const resolveSpy = jest.fn(() => testValue);
      const field = { resolve: resolveSpy, args: [] };
      directive.visitFieldDefinition(field);
      const result = await field.resolve(
        {}, // parent
        {}, // args
        context
      );
      
      expect(resolveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual("10.12.2012");
    });
    
    it("should return formatted according to passed format", async () => {
      const context = contextMock.createContext();
      const testValue = new Date(2012, 11, 10).toISOString();
      const resolveSpy = jest.fn(() => testValue);
      const field = { resolve: resolveSpy, args: [] };
      directive.visitFieldDefinition(field);
      const result = await field.resolve(
        {}, // parent
        {format: "yyyy-mm-dd"}, // args
        context
      );
      
      expect(resolveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual("2012-12-10");
    });
  });
});