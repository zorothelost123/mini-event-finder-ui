import React, { useState, useEffect } from 'react';
import axios from 'axios';
// --- ROUTER IMPORTS ---
import { Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

const API_URL = 'http://localhost:5001/api/events';

// -----------------------------------------------------------------
// 1. THE MAIN PAGE COMPONENT
// -----------------------------------------------------------------
function EventListAndForm() {
  const [events, setEvents] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    setError(null);
    let url = locationFilter ? `${API_URL}?location=${locationFilter}` : API_URL;

    axios.get(url)
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setError("Could not fetch events. Make sure the backend server is running!");
        setLoading(false);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleEventCreated = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const renderEventList = () => {
    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (events.length === 0) return <p>No events found.</p>;

    return events.map(event => (
      // The event card is now a Link
      <Link to={`/events/${event.id}`} key={event.id} className="event-card-link">
        <div className="event-card">
          <h3>{event.title}</h3>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Participants:</strong> {event.currentParticipants} / {event.maxParticipants}</p>
          <p>{event.description}</p>
        </div>
      </Link>
    ));
  };

  return (
    <main className="App-content">
      <EventForm onEventCreated={handleEventCreated} />

      <div className="list-controls">
        <h2>Upcoming Events</h2>
        <form className="filter-section" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="event-list">
        {renderEventList()}
      </div>
    </main>
  );
}

// -----------------------------------------------------------------
// 2. THE NEW EVENT DETAIL PAGE COMPONENT
// -----------------------------------------------------------------
function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Gets the ':id' from the URL

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching event:", error);
        setError("Could not load event details.");
        setLoading(false);
      });
  }, [id]); 

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <main className="App-content">
      <div className="event-detail-card">
        <Link to="/" className="back-link">&larr; Back to all events</Link>
        <h1>{event.title}</h1>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Participants:</strong> {event.currentParticipants} / {event.maxParticipants}</p>
        <p className="event-description">{event.description}</p>
      </div>
    </main>
  );
}

// -----------------------------------------------------------------
// 3. THE EVENT FORM (Same as before)
// -----------------------------------------------------------------
function EventForm({ onEventCreated }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !location || !date) {
      setError("Title, location, and date are required.");
      return;
    }
    const newEvent = { title, location, date, description, maxParticipants: Number(maxParticipants) };

    axios.post(API_URL, newEvent)
      .then(response => {
        onEventCreated(response.data);
        setTitle("");
        setLocation("");
        setDate("");
        setMaxParticipants(10);
        setDescription("");
      })
      .catch(error => {
        console.error("Error creating event:", error);
        setError("Could not create event. Please try again.");
      });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Create a New Event</h2>
      {error && <p className="form-error-message">{error}</p>}
      <div className="form-group">
        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" placeholder="Max Participants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />
      </div>
      <textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type='submit'>Create Event</button>
    </form>
  );
}

// -----------------------------------------------------------------
// 4. THE MAIN APP COMPONENT (The "Traffic Cop")
// -----------------------------------------------------------------
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="header-link">
          <h1>Slanup Event Finder</h1>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<EventListAndForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

export default App;