import jwt from "jsonwebtoken";

const generateAccessToken = (user) =>
    jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });
  
  // Verifica se o token é valido se for retorna o usuário do token
const verifyAccessToken = (token) =>
    jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  
export default {
    generateAccessToken,
    verifyAccessToken,
};