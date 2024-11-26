import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

export function DragHandle(props) {
  return (
    <Button
      variant={"ghost"}
      {...props}
      className="p-1 text-secondary-foreground/50 cursor-grab"
    >
      <span className="sr-only">Drag</span>
      <GripVertical />
    </Button>
  );
} 