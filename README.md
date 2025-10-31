# Mini Event Finder - UI (Frontend)

This is the React frontend for the Slanup full-stack internship challenge. It's a single-page application that allows users to find, create, and view event details.

**Live URL:** [https://mini-event-finder-ui.vercel.app](https://mini-event-finder-ui.vercel.app)

**This app connects to a live Node.js backend hosted on Render.**

---

### Features

* **View All Events:** Fetches and displays a list of all events from the API.
* **Create New Events:** A form to create a new event and `POST` it to the backend.
* **View Event Details:** Uses `react-router-dom` to show a detailed page for each event.
* **Location Filter:** A search bar to filter the event list by location (backend-powered).
* **Loading & Error States:** Shows feedback to the user while fetching data or if an error occurs.

---

### Tech Stack

* **React** (using Create React App)
* **React Router** (for "pages")
* **Axios** (for API requests)
* **CSS** (for custom styling)

---

### How to Run Locally

1.  Clone this repository:
    ```sh
    git clone [https://github.com/YOUR_GITHUB_USERNAME/mini-event-finder-ui.git](https://github.com/YOUR_GITHUB_USERNAME/mini-event-finder-ui.git)
    ```
2.  Navigate to the directory:
    ```sh
    cd mini-event-finder-ui
    ```
3.  Install dependencies:
    ```sh
    npm install
    ```
4.  **Important:** You must also have the [backend API](https://github.com/YOUR_GITHUB_USERNAME/mini-event-finder) running locally.
5.  Run the app:
    ```sh
    npm start
    ```
    The app will open on `http://localhost:3000`.