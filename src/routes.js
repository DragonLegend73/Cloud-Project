import express from "express";
import { connectDB } from "./db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/createNote", async (req, res) => {
  try {
    const db = await connectDB();
    const { title, body } = req.body;

    const result = await db.collection("notes").insertOne({
      title,
      body,
      date: new Date().toISOString()
    });

    res.json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

router.get("/getNote/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;

    const note = await db
      .collection("notes")
      .findOne({ _id: new ObjectId(id) });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

router.put("/updateNote/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;
    const { title, body } = req.body;

    await db.collection("notes").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, body, date: new Date().toISOString() } }
    );

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

router.delete("/deleteNote/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;

    await db.collection("notes").deleteOne({
      _id: new ObjectId(id)
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

export default router;
