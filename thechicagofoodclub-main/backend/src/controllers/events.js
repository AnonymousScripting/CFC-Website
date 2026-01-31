import { successResponse, errorResponse } from "../utils/customResponses.js";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

// Parse event description/location for RSVP links
const parseRsvpLinks = (event) => {
  const description = event.description || "";
  const location = event.location || "";
  const combined = `${description} ${location}`;

  // Patterns for different RSVP platforms
  const patterns = {
    partiful: /https?:\/\/(?:www\.)?partiful\.com\/[^\s<>"]+/gi,
    opentable: /https?:\/\/(?:www\.)?opentable\.com\/[^\s<>"]+/gi,
    resy: /https?:\/\/(?:www\.)?resy\.com\/[^\s<>"]+/gi,
    eventbrite: /https?:\/\/(?:www\.)?eventbrite\.com\/[^\s<>"]+/gi,
  };

  let rsvpType = null;
  let rsvpLink = null;

  // Check for Partiful first (priority)
  const partifulMatch = combined.match(patterns.partiful);
  if (partifulMatch) {
    rsvpType = "partiful";
    rsvpLink = partifulMatch[0];
  }

  // Check for OpenTable
  if (!rsvpLink) {
    const opentableMatch = combined.match(patterns.opentable);
    if (opentableMatch) {
      rsvpType = "opentable";
      rsvpLink = opentableMatch[0];
    }
  }

  // Check for Resy
  if (!rsvpLink) {
    const resyMatch = combined.match(patterns.resy);
    if (resyMatch) {
      rsvpType = "resy";
      rsvpLink = resyMatch[0];
    }
  }

  // Check for Eventbrite
  if (!rsvpLink) {
    const eventbriteMatch = combined.match(patterns.eventbrite);
    if (eventbriteMatch) {
      rsvpType = "eventbrite";
      rsvpLink = eventbriteMatch[0];
    }
  }

  return { rsvpType, rsvpLink };
};

// Format event for frontend
const formatEvent = (event) => {
  const { rsvpType, rsvpLink } = parseRsvpLinks(event);

  const start = event.start?.dateTime || event.start?.date;
  const end = event.end?.dateTime || event.end?.date;

  return {
    id: event.id,
    title: event.summary || "Untitled Event",
    description: event.description || "",
    location: event.location || "",
    start,
    end,
    isAllDay: !event.start?.dateTime,
    rsvpType,
    rsvpLink,
    htmlLink: event.htmlLink,
  };
};

export const getEvents = async (req, res) => {
  try {
    if (!CALENDAR_ID || !API_KEY) {
      return errorResponse(
        res,
        "Google Calendar not configured. Please set GOOGLE_CALENDAR_ID and GOOGLE_CALENDAR_API_KEY.",
        500
      );
    }

    const now = new Date().toISOString();
    const maxResults = req.query.limit || 10;

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events?key=${API_KEY}&timeMin=${now}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Calendar API error:", errorData);
      return errorResponse(
        res,
        `Failed to fetch events: ${errorData.error?.message || "Unknown error"}`,
        response.status
      );
    }

    const data = await response.json();
    const events = (data.items || []).map(formatEvent);

    return successResponse(res, "Events fetched successfully", { events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return errorResponse(res, error.message, 500);
  }
};
