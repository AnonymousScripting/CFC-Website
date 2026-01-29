import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY, JWT_EXPIRATION_TIME } from "./constants.js";

const createOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createJWTToken = async (payload) => {
  try {
    const token = await jwt.sign({ id: payload }, JWT_PRIVATE_KEY, {
      expiresIn: JWT_EXPIRATION_TIME,
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_PRIVATE_KEY);
};

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // console.log({tokenwithbearer:req.headers.authorization,token: req.headers.authorization.split(" ")[1]});
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

function generateRandomPassword(length = 12) {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const allChars = upperCase + lowerCase + numbers + symbols;

  let password = "";

  // Ensure at least one character from each group
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle password so predictable order is avoided
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

export {
  createOTP,
  createJWTToken,
  getToken,
  verifyToken,
  generateRandomPassword,
};
