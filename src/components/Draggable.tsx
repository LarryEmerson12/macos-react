import React, { useState, useRef } from "react";
import Draggable, { DraggableData } from "react-draggable";

interface DraggableProps {
  children: React.ReactNode;
}

export default function App({ children }: DraggableProps) {
  const nodeRef = useRef<HTMLDivElement>(null!);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };
  return (
    <div>
      <Draggable nodeRef={nodeRef} onDrag={(e, data) => trackPos(data)}>
        <div ref={nodeRef}>{children}</div>
      </Draggable>
    </div>
  );
}
