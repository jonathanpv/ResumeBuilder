import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Badge } from "./ui/badge";

export interface SortableItemProps {
  id: UniqueIdentifier;
  title: string;
  description?: string;
  children: React.ReactNode;
  badgeLabel?: string;
  rightElement?: React.ReactNode;
}

export function SortableItem({ 
  id, 
  title, 
  description, 
  children, 
  badgeLabel = "Section",
  rightElement 
}: SortableItemProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({id});

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-3 py-3 flex flex-row items-center border-b-2 border-secondary">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 cursor-grab"
        >
          <span className="sr-only">Move section</span>
          <GripVertical />
        </Button>
        <div className="flex-1 ml-2">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {rightElement && <div className="ml-auto">{rightElement}</div>}
        <Badge variant={"outline"} className="ml-2 font-semibold">
          {badgeLabel}
        </Badge>
      </CardHeader>
      <CardContent className={isDragging ? "hidden" :"px-3 pt-3 pb-6"}>
        {children}
      </CardContent>
    </Card>
  );
} 