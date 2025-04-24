import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { toast } from "react-toastify";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://personal-event-calendar-5.onrender.com/events")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        toast.error("Error fetching events: " + err.message);
      });
  }, []);

  //  Update an event in state
  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  //  Delete an event from state
  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">All Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEventUpdate={handleUpdateEvent} 
              onEventDelete={handleDeleteEvent} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
