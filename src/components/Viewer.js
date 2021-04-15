import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from '@react-three/drei'

const Viewer = ({ url }) => {  
  const material = new THREE.MeshPhongMaterial( { vertexColors: true, shininess: 10 } );

  const model = useLoader(STLLoader, url);  
  
  const ref = useRef();

  const { camera} = useThree();
  
 useEffect(() => {
    camera.up.set(0, 0, 1);         
    const bbox = new THREE.Box3().setFromObject(ref.current)      
    const sphere = bbox.getBoundingSphere(new THREE.Sphere())      
    const { center, radius } = sphere

    camera.position.copy(center.clone().add(new THREE.Vector3(1.5 * radius, -1.5 * radius, 1.5 * radius)))
    camera.far = 500 * radius
    camera.updateProjectionMatrix()

  }, [camera, url]);

  const orbit = useRef()
  useFrame(() => orbit.current && orbit.current.update())

  return (
    <>    
      <mesh ref={ref} dispose={null} position={[0,0,0]} >
        <primitive object={model} attach="geometry" />
        <meshPhongMaterial color={0xe0740d} material={material} />
      </mesh>       
      <OrbitControls ref={orbit}  rotateSpeed={0.8} />      
    </>
  );
};

export default Viewer
