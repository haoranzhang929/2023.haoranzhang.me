import { Suspense, useContext, useRef } from "react";
import { Canvas, extend, Object3DNode, useFrame, useLoader, useThree } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { BufferGeometry, Material, Mesh, TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
  const { darkMode } = useContext(ModeContext);
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

  const font = useLoader(FontLoader, TEXT_JSON);
  const [lightModeMatCap, darkModeMatCap] = useLoader(TextureLoader, [
    MAT_CAP_MATERIAL_LIGHT,
    MAT_CAP_MATERIAL_DARK
  ]);

  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += 0.01;
  //   }
  // });

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef}>
        <textGeometry
          args={[
            HAO_CHINESE_CHARACTER,
            {
              font,
              size: 4.5,
              height: 0.3,
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
    <div className="h-96 w-96">
      <Canvas>
        <HaoText />
        <Controls />
      </Canvas>
    </div>
  );
};

export default Hao;
