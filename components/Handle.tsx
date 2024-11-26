import React from 'react';
import { GripVertical } from 'lucide-react'; // You can use any icon library

export const Handle: React.FC = () => (
  <div className="handle" style={{ cursor: 'grab', marginBottom: '8px' }}>
    <GripVertical />
  </div>
); 