import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../server";
import jwt from "jsonwebtoken";

// Register a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists by username
    const existingUser = await prisma.user.findFirst({
      where: {
        username: String(username),
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (e) {
    console.error("Error creating user:", e);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        username: String(username),
      },
    });

    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return res
        .status(401)
        .send({ message: "username or password is not valid" });
    }

    const token = jwt.sign(
      {
        user: {
          username: existingUser.username,
          id: existingUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET || ""
      // { expiresIn: "15m" }
    );
    return res
      .status(200)
      .json({ message: "User was logged in successfully", token });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ data: users });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Get a single User by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Update a User by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "User updated successfuly", updatedUser });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Delete a User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(200)
      .json({ message: "User has been deleted successfuly", deletedUser });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
