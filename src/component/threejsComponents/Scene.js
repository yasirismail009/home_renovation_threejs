import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame ,useLoader} from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from 'three'
import { Vector3 } from "three";
import Blue from '../../assets/blue.jpg'
import White from '../../assets/white.png'
import Threed from '../../assets/uploads_files_2397542_black_leather_chair.gltf'
import Three2 from '../../assets/Tea_Table01.glb'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Button, Grid } from "@mui/material";
import Items from "./Items";
// import { useDrag, useDrop } from "react-dnd";
import Chair from "../../assets/uploads_files_2397542_black_leather_chair.gltf";
import Table from "../../assets/Tea_Table01.glb";
import { useDrop } from 'react-dnd'



function Model({ position ,rotation,handleClick }) {
  const meshRef = useRef();
  const gltf = useLoader(GLTFLoader, Threed);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(...rotation);
    }
  });

  return(   <mesh ref={meshRef} position={position} onClick={e=>{handleClick('model')}}><primitive object={gltf.scene} scale={[14, 14, 14]} /></mesh>);
}
function Model2({ position ,rotation,handleClick }) {
  const meshRef = useRef();
  const gltf = useLoader(GLTFLoader, Three2);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(...rotation);
    }
  });

  return(   <mesh ref={meshRef} position={position} onClick={e=>{handleClick('model2')}}><primitive object={gltf.scene} scale={[18, 18, 18]} /></mesh>);
}
const ItemTypes = {
  threeDModel: "item"
};

function Scene() {
  const [modelPosition, setModelPosition] = useState([0, -25, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [modelPosition2, setModelPosition2] = useState([0, -25, 0]);
  const [rotation2, setRotation2] = useState([0, -10, 0]);
  const [activeModel, setActiveModel] = useState("model");
  const [droppedItem, setDroppedItem] = useState(null);
  const [threeDModel, setThreeDModel] = useState([
    { title: "Chair 3D Model", item: Chair },
    { title: "Table 3D Model", item: Table },
  ]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.threeDModel,
    drop: (item) => {
      setDroppedItem(item);
      return { title: 'Canvas',droppedItem: item  };
    },
    collect: (monitor) => ({
      title: 'Canvas',
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const handleForward = () => {
    if(activeModel==="model"){
      setModelPosition([modelPosition[0], modelPosition[1], modelPosition[2] - 1])
    } else{
      setModelPosition2([modelPosition2[0], modelPosition2[1], modelPosition2[2] - 1])
    }
   
  };

  const handleBackward = () => {
    if(activeModel==="model"){
    setModelPosition([modelPosition[0], modelPosition[1], modelPosition[2] + 1]);
  } else{
    setModelPosition2([modelPosition2[0], modelPosition2[1], modelPosition2[2] + 1]);
  }
  };
    const handleForwardLeft = () => {
      if(activeModel==="model"){
    setModelPosition([modelPosition[0] - 1, modelPosition[1], modelPosition[2]])
  } else{
    setModelPosition2([modelPosition2[0] - 1, modelPosition2[1], modelPosition2[2]])
  }
  };

  const handleBackwardRight = () => {
    if(activeModel==="model"){
    setModelPosition([modelPosition[0]+ 1, modelPosition[1], modelPosition[2] ]);
  } else{
    setModelPosition2([modelPosition2[0]+ 1, modelPosition2[1], modelPosition2[2] ]);
  }
  };
  const handleRotateLeft = () => {
    if(activeModel==="model"){
    setRotation([0, rotation[1] - 0.1, 0]);
  } else{
    setRotation2([0, rotation2[1] - 0.1, 0]);
  }
  };

  const handleRotateRight = () => {
    if(activeModel==="model"){
    setRotation([0, rotation[1] + 0.1, 0]);
  } else{
    setRotation2([0, rotation2[1] + 0.1, 0]);
  }
  };
  const handleModelClick = (type) => {
    alert(type)
   setActiveModel(type)
  };
  
// useEffect(()=>{
//   alert(activeModel)
// },[activeModel])
  return (
    <>
      <Grid container>
          <Grid item xs={3}>
          {threeDModel.map((val, key) => (
            <Items threeDModel={val} key={key}/>
          ))}
            </Grid>
          <Grid item xs={9}><div className="w-full flex flex-row items-center justify-between">
          {droppedItem ? (
      <p>Release to drop the {droppedItem?.title} onto the canvas</p>
    ) : (
      <p>Drag a 3D model here to add it to the canvas</p>
    )}
      <Button variant="contained" style={{margin:"4px"}} onClick={handleForward}>Move Forward</Button>
      <Button variant="contained"  style={{margin:"4px"}} onClick={handleBackward}>Move Backward</Button>
           <Button variant="contained"  style={{margin:"4px"}} onClick={handleForwardLeft}>Move Left</Button>
      <Button variant="contained"  style={{margin:"4px"}} onClick={handleBackwardRight}>Move Right</Button>
      <Button variant="contained"  style={{margin:"4px"}} onClick={handleRotateLeft}>Rotate Left</Button>
      <Button variant="contained"  style={{margin:"4px"}} onClick={handleRotateRight}>Rotate Right</Button>
      </div>
    <Canvas style={{ height: "90vh", width: "100%" }} ref={drop} >
       {/* Ceiling */}
      
       <mesh position={[0, 25, 0]}>
            <boxGeometry args={[50, 1, 50]} />
            <meshBasicMaterial color="white" />
          </mesh>
          {/* Floor */}
          <mesh position={[0, -25, 0]}>
            <boxGeometry args={[50, 1, 50]} />
            <meshBasicMaterial color="#22ccc0" />
          </mesh>
          {/* Left Wall */}
          <mesh position={[-25, 0, 0]}>
            <boxGeometry args={[1, 50, 50]} />
            <meshBasicMaterial color="#22ccc0" />
          </mesh>
          {/* Right Wall */}
          {/* <mesh position={[25, 0, 0]}>
            <boxGeometry args={[1, 50, 50]} />
            <meshBasicMaterial color="White" />
          </mesh> */}
          {/* Back Wall */}
          <mesh position={[0, 0, -25]}>
            <boxGeometry args={[50, 50, 1]} />
            <meshBasicMaterial color="#25f9cf" />
          </mesh>
        
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault fov={75} position={[80, 20, 30]} />
      <Model  position={modelPosition} rotation={rotation} handleClick ={handleModelClick}/>
      <Model2  position={modelPosition2} rotation={rotation2} handleClick ={handleModelClick}/>
    </Canvas></Grid>
    
    </Grid>
      </>
  );
}

export default Scene;
