import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddEventPage = () => {
  const [formData, setFormData] = useState({ title: "", date: "", location: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields: Ensure title, date, and location are not empty
    if (!formData.title || !formData.date || !formData.location) {
      // Show SweetAlert2 error message
      Swal.fire("Error", "All fields are required!", "error");
      
      // Show React-Toastify error message
      toast.error("Please fill in all fields!");

      return; // Don't proceed with the form submission
    }

    // If validation passes, proceed with form submission
    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add event.");
      }

      const newEvent = await res.json();

      // Show success messages
      toast.success("Event Added!");
      Swal.fire("Success", "Your event has been added!", "success");

      // Optionally clear the form after submission
      setFormData({ title: "", date: "", location: "" });

    } catch (error) {
      // Handle any errors that occur during the fetch request
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="input"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
