import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D";
import Image from "next/image";

const ROTATION_SPEED = 0.005;
const Model = ({ baseSpeed = 0.0002 }): any => {
  const group: any = useRef();
  const [model, setModel] = useState<Object3D | null>(null);
  const [mixer] = useState(() => new THREE.AnimationMixer(null as any));

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/3d/scene.gltf", async (gltf: any) => {
      const nodes = await gltf.parser.getDependencies("node");
      const group = new THREE.Group();
      nodes.forEach((node: any) => group.add(node));
      setModel(group);
    });
  }, []);

  useFrame((_: any, delta: any) => mixer.update(delta));
  useFrame(() => {
    if (typeof group.current != "undefined")
      return (group.current.rotation.y += baseSpeed);
  });

  return (
    <>
      {model ? (
        <group ref={group} position={[0, -1, 2.6]} dispose={null}>
          <primitive ref={group} name="Object_0" object={model} />
        </group>
      ) : null}
    </>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[40, 10, 5]} intensity={0.2} />
      <directionalLight
        castShadow
        position={[10, 420, 100]}
        intensity={1.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-left={-30}
        shadow-camera-right={10}
        shadow-camera-top={40}
        shadow-camera-bottom={-10}
      />
      <spotLight intensity={0.5} position={[90, 100, 50]} castShadow />
    </>
  );
};

const Globe = () => {
  const SHOW_GLOBE = true;
  return (
    <div
      style={{
        minHeight: "380px",
        height: "50vh",
        width: "100%",
        marginLeft: "12vw",
      }}
    >
      <Canvas
        style={{ height: "100%", opacity: SHOW_GLOBE ? 1 : 0 }}
        camera={{
          fov: 50,
          near: 0.1,
          far: 1000,
          position: [0, 0, 4.5],
        }}
      >
        <Lights />
        <Model baseSpeed={ROTATION_SPEED} />
      </Canvas>
    </div>
  );
};

const HomePageComponent = () => {
  return (
    <>
      <div
        style={{
          minHeight: 250,
          backgroundColor: "#111",
          position: "relative",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundImage: `url("/glow.svg")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100%",
          }}
        >
          <main>
            <Image
              alt="The AI knowledge platform"
              style={{
                marginTop: 100,
                position: "absolute",
                marginLeft: -80,
              }}
              width={340}
              height={250}
              src="/byline.png"
            />
          </main>
          <Globe />
        </div>
      </div>
    </>
  );
};

export default HomePageComponent;
