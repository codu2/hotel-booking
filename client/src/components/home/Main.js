import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { softShadows, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";

import "./Main.css";

softShadows();

const Lights = () => {
  return (
    <>
      <directionalLight
        castShadow
        position={[0, 20, 0]}
        intensity={1}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-far={35}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[10, 10, 10]} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} castShadow />
      <spotLight
        position={[-10, 10, 10]}
        angle={0.2}
        intensity={2}
        castShadow
      />
    </>
  );
};

function House() {
  const [expand, setExpand] = useState(false);
  const ref = useRef();

  const props = useSpring({
    scale: expand ? [3.2, 3.2, 3.2] : [1, 1, 1],
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  useEffect(() => {
    setExpand(true);
  }, []);

  const gltf = useLoader(GLTFLoader, "/beachhouse/scene.gltf");

  return (
    <group ref={ref}>
      <a.primitive
        object={gltf.scene}
        position={[-6, 12, -2]}
        scale={props.scale}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      />
      <Html fullscreen>
        <div className="main__title">Welcome to HOUSNAP</div>
      </Html>
    </group>
  );
}

const Main = () => {
  return (
    <div className="main__container">
      <div className="main__wrapper">
        <div className="main__img">
          <img src="/images/background.jpg" alt="홈페이지 메인 이미지" />
        </div>

        <div className="main__3d">
          <Canvas shadows camera={{ position: [0, 0, 50], fov: 100 }}>
            <Lights />
            <Suspense fallback={null}>
              <House receiveShadow />
            </Suspense>
          </Canvas>
        </div>

        <div className="main__search">
          <div className="main__search-input">
            <label htmlFor="check_in">Check In</label>
            <input
              type="date"
              id="check_in"
              data-placeholder="Check-in date:"
              required
              aria-required="true"
            />
          </div>
          <div className="main__search-input">
            <label htmlFor="check_out">Check Out</label>
            <input
              type="date"
              id="check_in"
              data-placeholder="Check-out date:"
              required
              aria-required="true"
            />
          </div>
          <div className="main__search-input">
            <label htmlFor="adults">Adults</label>
            <input type="number" id="adults" placeholder="0" min="0" />
          </div>
          <div className="main__search-input">
            <label htmlFor="children">Children</label>
            <input type="number" id="children" placeholder="0" min="0" />
          </div>
        </div>
        <button className="main__search-button">
          Find the accommodation you want to stay
        </button>
      </div>
    </div>
  );
};

export default Main;
