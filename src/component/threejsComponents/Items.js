import React, { useState } from "react";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import "@google/model-viewer";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'



export default function Items({threeDModel, }) {
  const ItemTypes = {
    threeDModel: "threeDModel"
  };
  const name=threeDModel.title;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.threeDModel,
      item: { threeDModel },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          alert(`You dropped ${name} into ${dropResult.title}!`)
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [threeDModel],
  )
  return (
    <div className="p-4">
        <div className="w-52 h-52 shadow-md p-4 bg-red-500"  ref={drag}>
          {/* <OBJModel src={val.item} /> */}
          <model-viewer
            src={threeDModel.item}
            ios-src=""
            className="w-max"
            // poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
            alt={threeDModel.title}
            shadow-intensity="1"
            camera-controls
            auto-rotate
            ar
          />
          <p>{threeDModel.title}</p>
        </div>
    </div>
  );
}
