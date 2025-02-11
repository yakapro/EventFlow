import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableArrangement } from "../components/wedding/table-arrangement";
import { GuestInvitations } from "../components/wedding/guest-invitations";

export default function WeddingPlanningPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Wedding Planning</h1>
          <p className="text-muted-foreground mt-2">
            Manage your guest list and table arrangements
          </p>
        </div>

        <Tabs defaultValue="guests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="guests">Guest Invitations</TabsTrigger>
            <TabsTrigger value="tables">Table Arrangement</TabsTrigger>
          </TabsList>

          <TabsContent value="guests" className="space-y-4">
            <GuestInvitations />
          </TabsContent>

          <TabsContent value="tables" className="space-y-4">
            <TableArrangement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
