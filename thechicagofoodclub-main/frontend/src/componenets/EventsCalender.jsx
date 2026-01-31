import { useState } from "react";
import { Calendar, ExternalLink, Loader2 } from "lucide-react";

const CALENDAR_ID = "d60c48883e631d4000b33a95c0553fab1add01a942a19afba6523345080213e6@group.calendar.google.com";
const EMBED_URL = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FChicago`;
const ADD_URL = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(CALENDAR_ID)}`;

export default function EventsCalendar() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F7F4ED] rounded-lg">
            <Calendar className="w-6 h-6 text-[#C7A447]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
            <p className="text-sm text-gray-500">Chicago Food Club gatherings & experiences</p>
          </div>
        </div>

        <a
          href={ADD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#C7A447] hover:bg-[#b8963d] text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <Calendar className="w-4 h-4" />
          Add to My Calendar
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Calendar Container */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#C7A447] mb-3" />
            <p className="text-gray-500 text-sm">Loading calendar...</p>
          </div>
        )}

        {/* Calendar Iframe */}
        <iframe
          src={EMBED_URL}
          style={{ border: 0 }}
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          title="Chicago Food Club Calendar"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Footer hint */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Click on an event for details and RSVP links
      </p>
    </div>
  );
}
