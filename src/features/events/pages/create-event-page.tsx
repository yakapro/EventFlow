import { CreateEventForm } from "../components";
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Event</h1>
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <CreateEventForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
