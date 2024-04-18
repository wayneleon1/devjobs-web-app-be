import { Request, Response } from "express";
import { prisma } from "../server";

export const createJob = async (req: Request, res: Response) => {
  try {
    const {
      companyName,
      companySite,
      companyLogo,
      jobTitle,
      jobType,
      jobContent,
      location,
    } = req.body;
    const newJob = await prisma.jobs.create({
      data: {
        companyName,
        companySite,
        companyLogo,
        jobTitle,
        jobType,
        jobContent,
        location,
      },
    });
    res.status(200).json({ message: "Job created Succefully", newJob });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
