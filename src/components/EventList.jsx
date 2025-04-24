import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { toast } from "react-toastify"; // Importing toast for error/success notifications

const EventList = () => {
  const [events, setEvents] = useState([]); // Store events data
  const [loading, setLoading] = useState(true); // State to track if data is still loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch events from the server when the component mounts
  useEffect(() => {
    fetch("https://personal-event-calendar-5.onrender.com/events")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data); // Set events in the state
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError(err.message); // Set error if something goes wrong
        setLoading(false); // Set loading to false even if there is an error
        toast.error("Error fetching events: " + err.message); // Notify user of error
      });
  }, []); // Empty dependency array to run only once when component mounts

  // Loading and error handling in the UI
  if (loading) {
    return <div>Loading events...</div>; // Show loading message while data is fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there was an issue fetching
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">All Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length === 0 ? (
          <p>No events available.</p> // If there are no events, display this message
        ) : (
          events.map((event) => (
            <EventCard key={event.id} event={event} /> // Render each event
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
