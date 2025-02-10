import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "./components/providers";
import {
  EventsPage,
  CreateEventPage,
  EventDetailsPage,
} from "./features/events/pages";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Providers>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Providers>
    </Suspense>
  );
}

export default App;
