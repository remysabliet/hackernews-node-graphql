import { ValidationError } from "../types/errors.js";
export const validateRequired = (field, value) => {
    if (!value) {
        throw new ValidationError(`${field} is required`);
    }
};
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError("Invalid email format");
    }
};
export const validatePassword = (password) => {
    if (password.length < 6) {
        throw new ValidationError("Password must be at least 6 characters long");
    }
};
export const validateUrl = (url) => {
    try {
        new URL(url);
    }
    catch {
        throw new ValidationError("Invalid URL format");
    }
};
