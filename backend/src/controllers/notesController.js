import { prisma } from "../prismaClient.js";


export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.id,
      },
    });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const { q = "" } = req.query;

    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.id,
        deleted: false,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { updatedAt: "desc" },
    });

    res.json(notes);
  } catch (err) {
    next(err);
  }
};


export const getNoteById = async (req, res, next) => {
  try {
    const note = await prisma.note.findFirst({
      where: { id: +req.params.id, userId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    next(err);
  }
};


export const updateNote = async (req, res, next) => {
  try {
    const note = await prisma.note.update({
      where: { id: +req.params.id },
      data: req.body,
    });

    res.json(note);
  } catch (err) {
    next(err);
  }
};


export const deleteNote = async (req, res, next) => {
  try {
    await prisma.note.update({
      where: { id: +req.params.id },
      data: { deleted: true },
    });

    res.json({ message: "Note soft deleted" });
  } catch (err) {
    next(err);
  }
};
