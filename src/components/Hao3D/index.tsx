import { Suspense, useContext, useRef, useEffect, useState } from "react";
import { Canvas, extend, Object3DNode, useFrame, useLoader, useThree } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { BufferGeometry, Material, Mesh, TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { isMobile } from "react-device-detect";

import { ModeContext } from "../../context";

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
  }
}
extend({ TextGeometry, OrbitControls });

const MAT_CAP_MATERIAL_LIGHT = "2D2D2A_74716E_8F8C8C_92958E-128px.png";
const MAT_CAP_MATERIAL_DARK = "B0A2A8_866A63_E8E9F2_614C4F-128px.png";
const TEXT_JSON = "hao.json";
const HAO_CHINESE_CHARACTER = "皓";

const Controls = () => {
  const controls = useRef<OrbitControls>(null);
  const { camera, gl } = useThree();
  useFrame(() => controls.current?.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
};

const HaoText = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { darkMode } = useContext(ModeContext);
  const { camera } = useThree();
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

  const font = useLoader(FontLoader, TEXT_JSON);
  const [lightModeMatCap, darkModeMatCap] = useLoader(TextureLoader, [
    MAT_CAP_MATERIAL_LIGHT,
    MAT_CAP_MATERIAL_DARK
  ]);

  useFrame(() => {
    if (meshRef.current) {
      if (isMobile) {
        // rotate the text
        meshRef.current.rotation.y += 0.005;
      } else {
        camera.position.x = mousePos.x;
        camera.position.y = mousePos.y;
        camera.lookAt(meshRef.current.position);
      }
    }
  });

  useEffect(() => {
    // add mouse event listener if not on mobile
    const onMouseMove = (event: MouseEvent) => {
      const { innerWidth: width, innerHeight: height } = window;
      setMousePos({
        x: -(event.clientX - width / 2) / 400,
        y: -(height - event.clientY - height / 2) / 400
      });
    };
    !isMobile && window.addEventListener("mousemove", onMouseMove);
    return () => {
      !isMobile && window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef}>
        <textGeometry
          args={[
            HAO_CHINESE_CHARACTER,
            {
              font,
              size: 4.5,
              height: 0.5,
              curveSegments: 6,
              bevelEnabled: true,
              bevelThickness: 0.01,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 6
            }
          ]}
          onUpdate={self => self.center()}
        />
        <meshMatcapMaterial matcap={darkMode ? darkModeMatCap : lightModeMatCap} />
      </mesh>
    </Suspense>
  );
};

const Hao = () => {
  return (
    <div className="flex h-96 w-full flex-col justify-around md:flex-row md:justify-between">
      <div className="h-96 w-full md:h-auto md:w-1/2">
        <Canvas>
          <HaoText />
          {isMobile && <Controls />}
        </Canvas>
      </div>
      <div className="flex w-full items-center justify-center md:w-1/2 ">
        <div className="text-center sm:text-left">
          <p className="mt-auto text-2xl">Hao is a fullstack software engineer</p>
          <p className="my-3 text-2xl">based in Dublin, Ireland 🇮🇪</p>
          <p className="text-2xl">Code 💻 & Music 🎸 are my passions</p>
        </div>
      </div>
    </div>
  );
};

export default Hao;
