import { Request, Response } from "express";
import { prisma } from "../server";
import { uploadToCloud } from "../helper/cloud";

export const createJob = async (req: Request, res: Response) => {
  try {
    const {
      company,
      logoBackground,
      contract,
      apply,
      position,
      location,
      website,
      description,
    } = req.body;

    // Upload Image
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      if ("url" in result) {
        // If 'url' property exists in result, set imageUrl
        imageUrl = result.url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }
    const newJob = await prisma.jobs.create({
      data: {
        company,
        logo: imageUrl as string,
        logoBackground,
        contract,
        apply,
        position,
        website,
        location,
        description,
      },
    });

    res.status(200).json({ message: "Job created successfully", newJob });
  } catch (e) {
    console.error("Error creating job:", e);
    res
      .status(500)
      .json({ error: "An error occurred while creating the job." });
  }
};

// Get all jobs
export const getAlljobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.jobs.findMany();
    res.status(200).json({ data: jobs });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Get a single job by ID
export const getJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await prisma.jobs.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ data: job });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Update a jobs by ID
export const updatejob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      company,
      logoBackground,
      contract,
      apply,
      position,
      location,
      website,
      description,
    } = req.body;

    // Upload Image
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      if ("url" in result) {
        // If 'url' property exists in result, set imageUrl
        imageUrl = result.url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }
    const updatedJob = await prisma.jobs.update({
      where: {
        id: Number(id),
      },
      data: {
        company,
        logo: imageUrl as string,
        logoBackground,
        contract,
        apply,
        position,
        location,
        website,
        description,
      },
    });
    res.status(200).json({ message: "jobs updated successfuly", updatedJob });
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
