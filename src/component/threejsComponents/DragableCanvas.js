import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useDrag, useDrop } from 'react-dnd';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from 'three';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Chair from '../../assets/uploads_files_2397542_black_leather_chair.gltf'
import Table from '../../assets/Tea_Table01.glb'

function Asset(props) {
  const { scene } = useThree();

  const [position, setPosition] = React.useState(props.position);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ASSET',
    item: { asset: props.assetUrl, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const dropResult = monitor.getDropResult();
        setPosition(dropResult.position);
      }
    },
  }));

  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(props.assetUrl, (gltf) => {
      const asset = gltf.scene;
      scene.add(asset);
      drag(asset);
    });
  }, [scene, drag, props.assetUrl]);

  return (
    <mesh ref={drag} position={position}>
      <boxBufferGeometry />
      <meshStandardMaterial color={isDragging ? 'red' : 'green'} />
    </mesh>
  );
}

function DropTarget() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ASSET',
    drop: (item, monitor) => ({
      position: monitor.getClientOffset(),
    }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <mesh ref={drop}>
      <boxBufferGeometry />
      <meshStandardMaterial color={canDrop ? (isOver ? 'blue' : 'purple') : 'orange'} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Canvas>
        <Asset assetUrl={Chair} position={[0, 0, 0]} />
        <DropTarget />
        <OrbitControls />
      </Canvas>
    </DndProvider>
  );
}
