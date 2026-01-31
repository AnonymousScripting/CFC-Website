import express from "express";
import { getEvents } from "../controllers/events.js";

const router = express.Router();

// GET /api/events - Fetch upcoming events from Google Calendar
router.get("/", getEvents);

export default router;
