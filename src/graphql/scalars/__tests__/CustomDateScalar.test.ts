import { CustomDateScalar } from "../CustomDateScalar.js";
import { GraphQLError } from "graphql";

describe("CustomDateScalar", () => {
  const scalar = CustomDateScalar;

  describe("serialize", () => {
    it("should serialize valid Date object", () => {
      const date = new Date("2024-03-20T12:00:00Z");
      expect(scalar.serialize(date)).toBe("2024-03-20T12:00:00.000Z");
    });

    it("should serialize valid date string", () => {
      const dateStr = "2024-03-20T12:00:00Z";
      expect(scalar.serialize(dateStr)).toBe("2024-03-20T12:00:00.000Z");
    });

    it("should throw on invalid date", () => {
      expect(() => scalar.serialize("invalid-date")).toThrow(GraphQLError);
    });
  });

  describe("parseValue", () => {
    it("should parse valid date string", () => {
      const date = scalar.parseValue("2024-03-20T12:00:00Z");
      expect(date).toBeInstanceOf(Date);
      expect(date.toISOString()).toBe("2024-03-20T12:00:00.000Z");
    });

    it("should throw on date before 1900", () => {
      expect(() => scalar.parseValue("1899-12-31T12:00:00Z")).toThrow(GraphQLError);
    });

    it("should throw on date too far in future", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 51);
      expect(() => scalar.parseValue(futureDate.toISOString())).toThrow(GraphQLError);
    });
  });
}); 