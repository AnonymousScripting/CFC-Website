export default function EventsCalendar() {
  const calendarUrl = import.meta.env.VITE_CALENDAR_IFRAME;
  return (
    <div
      style={{
        overflow: "hidden",
      }}
      className=""
    >
      <h2 className="text-2xl ml-4 font-bold mb-8 text-gray-800">Upcoming Events</h2>
      <iframe
        src={calendarUrl} 
        style={{ border: 0, width: "100%", height: "600px" }}
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </div>
  );
}
