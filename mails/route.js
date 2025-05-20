import express from "express";
import { createMail, getMails, starMail, deleteMail, markAsRead } from "./controller.js";

const router = express.Router();

// Route to create a new mail
router.post("/create", createMail);

// Route to get all mails
router.get("/getAll", getMails);

// Route to delete a mail by ID
router.delete("/delete/:id", deleteMail);

// Route to mark a mail as starred
router.post("/star", starMail); //it was get method

router.post("/markasread", markAsRead); //didnt add this
export default router;
