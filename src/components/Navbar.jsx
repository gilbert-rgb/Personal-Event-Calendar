import { Link } from "react-router-dom";
import { FaHome, FaCalendar, FaPlusCircle } from "react-icons/fa"; 

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <ul className="flex justify-around">
      <li>
        <Link to="/">
          <FaHome className="inline mr-2" /> Home
        </Link>
      </li>
      <li>
        <Link to="/calendar">
          <FaCalendar className="inline mr-2" /> Calendar
        </Link>
      </li>
      <li>
        <Link to="/add-event">
          <FaPlusCircle className="inline mr-2" /> Add Event
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
