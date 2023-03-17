import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ id, x, y, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "item", id, x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
