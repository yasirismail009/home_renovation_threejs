import React, { Suspense, useRef, useState } from "react";
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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { PerspectiveCamera } from '@react-three/drei';

// function CarShow() {
//   const meshRef = useRef(null);
//   useFrame(() => {
//     if(!meshRef.current){
//       return;
//     }
//     meshRef.current.rotation.x +=0.01;
//     meshRef.current.rotation.y +=0.01;
//   });
//   return (
//     <>
//       <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

//       <PerspectiveCamera makeDefault fov={100} position={[0, 0, 0]} />
//       <mesh ref={meshRef} position={[1,1,1]}>
//         <boxGeometry args={[4, 4, 4]} />
//         <meshBasicMaterial color="red" />
//       </mesh>
//     </>
//   );
// }
function Model({ position ,rotation}) {
  const meshRef = useRef();
  const gltf = useLoader(GLTFLoader, Threed);

  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.x += 0.01;
  //     meshRef.current.rotation.y += 0.01;
  //   }
  // });
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(...rotation);
    }
  });

  return(   <mesh ref={meshRef} position={position}><primitive object={gltf.scene} scale={[14, 14, 14]} /></mesh>);
}

function Scene() {
  const [modelPosition, setModelPosition] = useState([0, -25, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const handleForward = () => {
    setModelPosition([modelPosition[0], modelPosition[1], modelPosition[2] - 1])
    console.log("forward",modelPosition );
  };

  const handleBackward = () => {
    setModelPosition([modelPosition[0], modelPosition[1], modelPosition[2] + 1]);
  };
  const handleRotateLeft = () => {
    setRotation([0, rotation[1] - 0.1, 0]);
  };

  const handleRotateRight = () => {
    setRotation([0, rotation[1] + 0.1, 0]);
  };
  return (
    <>
      <button onClick={handleForward}>Move Forward</button>
      <button onClick={handleBackward}>Move Backward</button>
      <button onClick={handleRotateLeft}>Rotate Left</button>
      <button onClick={handleRotateRight}>Rotate Right</button>
    <Canvas>
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
      <Model  position={modelPosition} rotation={rotation}/>
    </Canvas>
    
      </>
  );
}

export default Scene;

