import { GraphQLScalarType, GraphQLError } from "graphql";
import { Kind } from "graphql/language/index.js";
/**
 * Custom Date scalar with validation for TypeGraphQL
 */
export const CustomDateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Custom Date scalar with validation - ISO 8601 format with business rules",
    // Serialize: Convert internal Date to string for client
    serialize(value) {
        if (value instanceof Date) {
            if (isNaN(value.getTime())) {
                throw new GraphQLError("Invalid date: Date object is invalid");
            }
            return value.toISOString();
        }
        if (typeof value === "string") {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new GraphQLError(`Invalid date string: ${value}`);
            }
            return date.toISOString();
        }
        if (typeof value === "number") {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new GraphQLError(`Invalid timestamp: ${value}`);
            }
            return date.toISOString();
        }
        throw new GraphQLError(`Cannot serialize date: ${typeof value} is not a valid date type`);
    },
    // ParseValue: Parse variables (from client variables)
    parseValue(value) {
        return parseAndValidateDate(value);
    },
    // ParseLiteral: Parse inline values (from query literals)
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return parseAndValidateDate(ast.value);
        }
        if (ast.kind === Kind.INT) {
            return parseAndValidateDate(parseInt(ast.value));
        }
        throw new GraphQLError(`Invalid date literal: expected string or int, got ${ast.kind}`);
    },
});
/**
 * Parse and validate date with comprehensive checks
 */
function parseAndValidateDate(value) {
    let date;
    // Handle different input types
    if (value instanceof Date) {
        date = value;
    }
    else if (typeof value === "string") {
        if (value.trim() === "") {
            throw new GraphQLError("Date cannot be empty string");
        }
        date = new Date(value);
    }
    else if (typeof value === "number") {
        validateTimestamp(value);
        date = new Date(value);
    }
    else {
        throw new GraphQLError(`Invalid date type: expected string, number, or Date, got ${typeof value}`);
    }
    // Check if date is valid
    if (isNaN(date.getTime())) {
        throw new GraphQLError(`Invalid date: ${value} cannot be parsed as a valid date`);
    }
    // Custom business rule validations
    validateDateConstraints(date);
    return date;
}
/**
 * Validate timestamp is within reasonable bounds
 */
function validateTimestamp(timestamp) {
    const minTimestamp = new Date("1970-01-01").getTime();
    const maxTimestamp = new Date("2100-01-01").getTime();
    // Handle both seconds and milliseconds timestamps
    const tsInMs = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
    if (tsInMs < minTimestamp || tsInMs > maxTimestamp) {
        throw new GraphQLError(`Timestamp out of range: ${timestamp}. Must be between 1970 and 2100`);
    }
}
/**
 * Custom business rule validations
 */
function validateDateConstraints(date) {
    const now = new Date();
    // Check if date is too far in the past (before 1900)
    if (date.getFullYear() < 1900) {
        throw new GraphQLError(`Date too old: ${date.toISOString()}. Dates before 1900 are not allowed`);
    }
    // Check if date is too far in the future (more than 50 years from now)
    const maxFutureDate = new Date();
    maxFutureDate.setFullYear(now.getFullYear() + 50);
    if (date > maxFutureDate) {
        throw new GraphQLError(`Date too far in future: ${date.toISOString()}. Dates more than 50 years in the future are not allowed`);
    }
}
