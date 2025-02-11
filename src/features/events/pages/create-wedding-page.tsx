import { CreateWeddingForm } from "../components/wedding/create-wedding-form";

export default function CreateWeddingPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Wedding Event</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details below to create your wedding event
          </p>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-lg">
          <CreateWeddingForm />
        </div>
      </div>
    </div>
  );
}
