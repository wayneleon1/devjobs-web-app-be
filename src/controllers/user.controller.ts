import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../server";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // const userAvailable = await prisma.user.findUnique({
    //   where: {
    //     username: String(username),
    //   },
    // });

    // if (userAvailable) {
    //   return res.status(400).json({ message: "User already registered!" });
    // }
    console.log(req.body);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "User registered Succefully" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ data: users });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
