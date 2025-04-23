import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EventCard = ({ event, onEventUpdate, onEventDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format date for input
    if (name === 'date') {
      const formattedDate = new Date(value).toISOString().slice(0, 16);
      setUpdatedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: formattedDate,
      }));
    } else {
      setUpdatedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
  };

  // Handle event update (PATCH)
  const handleUpdate = () => {
    setLoading(true); // Show loading state
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        onEventUpdate(data);
        toast.success("Event updated successfully!");
        Swal.fire("Success!", "The event has been updated.", "success");
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error("Error updating event. Please try again.");
        Swal.fire("Error!", "There was an error updating the event.", "error");
      })
      .finally(() => setLoading(false)); // Reset loading state
  };

  // Handle event deletion (DELETE)
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/events/${event.id}`, {
          method: "DELETE",
        })
          .then(() => {
            onEventDelete(event.id);
            toast.success("Event deleted successfully!");
            Swal.fire("Deleted!", "Your event has been deleted.", "success");
          })
          .catch((error) => {
            toast.error("Error deleting event. Please try again.");
            Swal.fire("Error!", "There was an error deleting the event.", "error");
          });
      }
    });
  };

  return (
    <div className="event-card p-4 border rounded shadow-md mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={updatedEvent.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="description"
            value={updatedEvent.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="datetime-local"
            name="date"
            value={updatedEvent.date}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p>{event.description}</p>
          <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
