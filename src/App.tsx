import { Suspense } from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { Providers } from "./components/providers";
import {
  EventsPage,
  CreateEventPage,
  EventDetailsPage,
  CreateWeddingPage,
  WeddingPlanningPage,
} from "./features/events/pages";
import OrganizerDashboardPage from "./features/events/pages/organizer-dashboard-page";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Providers>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/create-wedding" element={<CreateWeddingPage />} />
          <Route
            path="/wedding-planning/:id"
            element={<WeddingPlanningPage />}
          />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route
            path="/organizer/dashboard"
            element={<OrganizerDashboardPage />}
          />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
      </Providers>
    </Suspense>
  );
}

export default App;
