"use server";

import { db } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user)
      return { status: 403, error: "User Not Authenticate" };

    const projects = await db.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updateAt: "desc",
      },
    });

    if (projects.length === 0)
      return { status: 404, error: "No Projects Found" };

    return { status: 200, data: projects };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user)
      return { status: 403, error: "User Not Authenticate" };

    const projects = await db.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updateAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0)
      return { status: 400, error: "No recent projects available" };

    return { status: 200, data: projects };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user)
      return { status: 403, error: "User Not Authenticate" };

    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!updatedProject)
      return { status: 500, error: "Failed to recover project" };

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user)
      return { status: 403, error: "User Not Authenticate" };

    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!updatedProject)
      return { status: 500, error: "Failed to delete project" };

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and outlines are required." };
    }
    const allOutlines = outlines.map((outline) => outline.title);
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user)
      return { status: 403, error: "User Not Authenticate" };

    const project = await db.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updateAt: new Date(),
        userId: checkUser.user.id,
      },
    });

    if (!project) return { status: 500, error: "Failed to create project" };

    return { status: 200, data: project };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user)
      return { status: 403, error: "User Not Authenticate" };

    const project = await db.project.findFirst({
      where: { id: projectId },
    });

    if (!project) return { status: 404, error: "Project not found" };

    return { status: 200, data: project };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
