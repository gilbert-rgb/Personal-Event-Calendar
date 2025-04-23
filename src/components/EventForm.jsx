import { useState } from "react";

const EventForm = ({ onEventAdd }) => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onEventAdd to add the event
    onEventAdd(event);
    // Reset form after submission
    setEvent({
      title: "",
      description: "",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl">Add New Event</h2>
      <div>
        <label className="block mb-2">Event Title:</label>
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Event Description:</label>
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Event Date:</label>
        <input
          type="datetime-local"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
