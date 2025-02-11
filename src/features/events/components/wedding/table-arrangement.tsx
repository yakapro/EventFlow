import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Guest {
  id: string;
  name: string;
  tableNumber: number;
}

interface Table {
  id: number;
  capacity: number;
  guests: Guest[];
}

export function TableArrangement() {
  const [tables, setTables] = useState<Table[]>([
    { id: 1, capacity: 8, guests: [] },
    { id: 2, capacity: 8, guests: [] },
  ]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuestName, setNewGuestName] = useState("");

  const addGuest = () => {
    if (newGuestName.trim()) {
      const newGuest: Guest = {
        id: Date.now().toString(),
        name: newGuestName.trim(),
        tableNumber: 0,
      };
      setGuests([...guests, newGuest]);
      setNewGuestName("");
    }
  };

  const addTable = () => {
    const newTable: Table = {
      id: tables.length + 1,
      capacity: 8,
      guests: [],
    };
    setTables([...tables, newTable]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceTableId = parseInt(source.droppableId);
    const destTableId = parseInt(destination.droppableId);

    const newTables = [...tables];
    const sourceTable = newTables.find((t) => t.id === sourceTableId);
    const destTable = newTables.find((t) => t.id === destTableId);

    if (!sourceTable || !destTable) return;

    const [movedGuest] = sourceTable.guests.splice(source.index, 1);
    destTable.guests.splice(destination.index, 0, movedGuest);

    setTables(newTables);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="space-y-2 flex-1">
          <Label>Add Guest</Label>
          <div className="flex gap-2">
            <Input
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              placeholder="Enter guest name"
              onKeyPress={(e) => e.key === "Enter" && addGuest()}
            />
            <Button onClick={addGuest}>Add</Button>
          </div>
        </div>
        <Button onClick={addTable}>Add Table</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => (
            <Card key={table.id} className="p-4">
              <h3 className="font-semibold mb-2">Table {table.id}</h3>
              <Droppable droppableId={table.id.toString()}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[100px] space-y-2"
                  >
                    {table.guests.map((guest, index) => (
                      <Draggable
                        key={guest.id}
                        draggableId={guest.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 bg-muted rounded-md"
                          >
                            {guest.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className="text-sm text-muted-foreground mt-2">
                {table.guests.length}/{table.capacity} seats filled
              </div>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
