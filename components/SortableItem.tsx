import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Handle } from './Handle';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative',
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
    marginBottom: '16px',
    borderRadius: '8px',
  };

  console.log("::debug logic:: SortableItem render", {
    id,
    isDragging,
    hasTransform: !!transform,
  });

  return (
    <div ref={setNodeRef} style={style}>
      <div 
        className="drag-handle absolute left-0 top-0 h-full px-2 flex items-center cursor-grab active:cursor-grabbing"
        {...attributes} 
        {...listeners}
      >
        <Handle />
      </div>
      <div className="pl-8">
        {children}
      </div>
    </div>
  );
}; 