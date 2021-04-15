import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import Viewer from './components/Viewer'

import './css/App.css'
import './css/bootstrap.min.css'


const App = () => {
  const [source, setSource] = useState('/cat1.stl');
  
  const getFile = (event) => {    
    setSource(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <>
    <div className="card mb-3">
      <h3 className="card-header">Viewer of STL File</h3>
      <div className="card-body">
        <h5 className="card-title">Change Model? : </h5>        
          <input className="form-control-file" type="file" onChange={(e) => getFile(e)} accept=".stl" />
      </div>
    </div>
      <Canvas style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >    
                
        <ambientLight intensity={0.2} />
        <directionalLight intensity={0.6} position={[0, 30, 30]} color="white" />
        <directionalLight intensity={0.6} position={[0, -30, -30]} color="white" />    
         
          <Suspense fallback={null}>
         
            <Viewer url={source}/>
            
          </Suspense> 
          
          {/* <OrbitControls />                                            */}
      </Canvas>
    </>
  )

}

export default App;
