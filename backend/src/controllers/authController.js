import bcrypt from "bcryptjs";
import { prisma } from "../prismaClient.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

const isMatch = await bcrypt.compare(password, user.password);
    
if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};