import React, { Suspense, useRef, useState } from 'react'

import { Canvas, useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from '@react-three/drei'


const StlModel = ({ url }) => {
  const stl = useLoader(STLLoader, url);

  const ref = useRef();

  return (
    <>
      <mesh ref={ref} >
          <primitive object={stl} attach="geometry"/>
          <meshStandardMaterial color={"orange"}/>
      </mesh>
    </>
  );
};


const Viewer = ({ urlInput }) => {

  const [source, setSource] = useState('/plant.stl');

  if (urlInput) {
    setSource(urlInput);
  }

  return (
    <>
      <Canvas colorManagement camera={{position: [0, -3, 0], fov: 70}}>
        <Suspense fallback={null}>
          <StlModel url={source}/>
        </Suspense>

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default Viewer
