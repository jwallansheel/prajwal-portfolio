import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function RotatingCube() {
  const cubeRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Map mouse position to range (-1, 1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotate cube based on mouse position
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y = mousePosition.x * Math.PI; // Rotate based on X-axis
      cubeRef.current.rotation.x = mousePosition.y * Math.PI; // Rotate based on Y-axis
    }
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[4, 4, 4]} /> //args are the dimension ratios
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Turret() {
  return (
    <Canvas className="h-1/2">
      <ambientLight intensity={1.0} />
      <pointLight position={[100, 100, 100]} />
      <RotatingCube />
    </Canvas>
  );
}
// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";

// function Tank() {
//   const tankRef = useRef();

//   // Tank rotation or animation logic can go here
//   useFrame(() => {
//     if (tankRef.current) {
//       // Example rotation or movement, e.g., rotate on the y-axis
//       tankRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <group ref={tankRef} position={[1, 1, 1]}>
//       {/* Tank Base */}
//       <mesh position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 0.8, 2]} />
//         <meshStandardMaterial color="green" />
//       </mesh>

//       {/* Turret */}
//       <mesh position={[0, 1, 0]}>
//         <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
//         <meshStandardMaterial color="darkgreen" />
//       </mesh>

//       {/* Barrel - Rotation set on the mesh directly */}
//       <mesh position={[0, 1, 1]} rotation={[Math.PI / 2, 0, 0]}>
//         <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
//         <meshStandardMaterial color="gray" />
//       </mesh>

//       {/* Left Track */}
//       <mesh position={[-1.5, 0.25, 0]}>
//         <boxGeometry args={[0.2, 0.5, 2.2]} />
//         <meshStandardMaterial color="black" />
//       </mesh>

//       {/* Right Track */}
//       <mesh position={[1.5, 0.25, 0]}>
//         <boxGeometry args={[0.2, 0.5, 2.2]} />
//         <meshStandardMaterial color="black" />
//       </mesh>
//     </group>
//   );
// }

// export default function App() {
//   return (
//     <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
//       <ambientLight intensity={1.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Tank />
//     </Canvas>
//   );
// }
