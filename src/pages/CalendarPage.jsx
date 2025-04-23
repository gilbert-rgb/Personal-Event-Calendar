import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import EventCard from "../components/EventCard";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState(""); // New state for the search query

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // Handle date selection on the calendar
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Filter events for the selected date
  const eventsOnSelectedDate = events.filter((event) => {
    const eventDate = new Date(event.date); // Assuming event has a `date` field
    return eventDate.toDateString() === date.toDateString();
  });

  // Filter events based on search query
  const filteredEvents = eventsOnSelectedDate.filter((event) => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()); // Assuming event has a `title` field
  });

  // Add a new event to the list
  const handleEventAdd = (newEvent) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        })
          .then((res) => res.json())
          .then((data) => {
            setEvents((prevEvents) => [...prevEvents, data]);

            toast.success("Event added successfully!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });

            Swal.fire("Success!", "The event has been added.", "success");
          })
          .catch((error) => {
            toast.error("Error adding event. Please try again.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });

            Swal.fire("Error!", "There was an error adding the event.", "error");
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Upcoming Events</h1>

      {/* Event Form */}
      <EventForm onEventAdd={handleEventAdd} />

      <div className="flex gap-6 mt-6">
        {/* Calendar */}
        <Calendar onChange={handleDateChange} value={date} />

        <div className="flex flex-col">
          <h2 className="text-2xl">Events on {date.toDateString()}</h2>

          {/* Search Bar */}
          <div className="flex items-center border rounded p-2 mb-4">
            <FaSearch className="mr-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>No events found matching your search.</p>
            )}
          </div>
        </div>
      </div>

      {/* Event List */}
      <EventList />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CalendarPage;
