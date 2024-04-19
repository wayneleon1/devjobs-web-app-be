import { Request, Response } from "express";
import { prisma } from "../server";

// Create a new job
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

// Gett all jobs
export const getAlljobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.jobs.findMany();
    res.status(200).json(jobs);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Delete a job
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedJob = await prisma.jobs.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(200)
      .json({ message: "Job has been deleted successfuly", deletedJob });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
