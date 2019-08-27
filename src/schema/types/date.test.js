const { Kind } = require("graphql");

const date = require("./date");

describe("date", () => {
  describe("custom scalar type", () => {
    describe("Date", () => {
      const scalarType = date.resolvers.Date;
      describe("serialize", () => {
        it("should serialize a valid date to ISO string", () => {
          const testDate = new Date();
          const result = scalarType.serialize(testDate);
          expect(result).toEqual(testDate.toISOString());
        });
        
        it("should return null if the given value is not a date", () => {
          const result = scalarType.serialize("not a date");
          expect(result).toBe(null);
        });
      });
      describe("parseValue", () => {
        it("should parse date ISO string to date", () => {
          const testDate = new Date();
          const result = scalarType.parseValue(testDate.toISOString());
          expect(result).toEqual(testDate);
        });
        
        it("should be able to handle strings which are not dates", () => {
          const result = scalarType.parseValue("not a date");
          expect(result).toBe(null);
        });
        
        it("should be able to handle null value", () => {
          const result = scalarType.parseValue(null);
          expect(result).toBe(null);
        });
      });
      
      describe("parseLiteral", () => {
        it("should parse a valid literal", () => {
          const testDate = new Date();
          const testLiteral = {
            value: testDate.toISOString(),
            kind: Kind.STRING,
          };
          const result = scalarType.parseLiteral(testLiteral);
          expect(result).toEqual(testDate);
        });
        
        it("should handle none string literals", () => {
          const testLiteral = {
            value: false,
            kind: Kind.BOOLEAN,
          };
          const result = scalarType.parseLiteral(testLiteral);
          expect(result).toBe(null);
        });
      });
    });
  });
});