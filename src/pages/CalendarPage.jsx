import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventCard from "../components/EventCard";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://personal-event-calendar-5.onrender.com/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data); // Optional debug log
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const eventsOnSelectedDate = events.filter((event) => {
    if (!event?.date) return false;
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === date.toDateString();
  });

  const filteredEvents = eventsOnSelectedDate.filter((event) => {
    return event?.title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
        fetch("http:personal-event-calendar-5.onrender.com/events", {
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
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Upcoming Events</h1>

      {/* Event Form */}
      <EventForm onEventAdd={handleEventAdd} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Calendar */}
        <Calendar onChange={handleDateChange} value={date} />

        <div className="flex-1 flex flex-col     ">
          <h2 className="text-2xl mb-2">Events on {date.toDateString()}</h2>

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

          {/* Filtered Event Cards */}
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

      {/* All Events List */}
      <EventList />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CalendarPage;
