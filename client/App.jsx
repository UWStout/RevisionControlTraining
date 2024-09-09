// Main React Library
import React from 'react'

// React-three-fiber Library
import { Canvas } from '@react-three/fiber'

// Drei R3F helpers
import { Stage, Grid, OrbitControls, Environment } from '@react-three/drei'

// R3F Postprocessing library
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'

// Rotating 3d Text
import CircleText from './CircleText.jsx'

// The Kamdo model
import Kamdo from './Kamdo.jsx'

export default function App () {
  return (
    // The main container for the entire world
    <Canvas flat shadows camera={{ position: [-15, 0, 10], fov: 45 }}>
      {/* Fog for distant objects */}
      <fog attach='fog' args={['black', 15, 22.5]} />

      {/* General PBR studio lighting and shadow calculations */}
      <Stage
        intensity={0.5}
        environment='city'
        shadows={{
          type: 'accumulative',
          bias: -0.001,
          intensity: Math.PI
        }}
        adjustCamera={false}
      >
        {/* Render the drone and its lights */}
        <Kamdo rotation={[0, Math.PI, 0]} />

         {/* Render the text */}
        {/* <CircleText scale={2.0} fontSize={0.667} /> */}
      </Stage>

      {/* Render a regular grid as the floor */}
      <Grid renderOrder={-1} position={[0, -1.85, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={30} />

      {/* Provide basic orbit controls */}
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />

      {/* Provide post-processing effects */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={2} mipmapBlur />
        <ToneMapping />
      </EffectComposer>

      {/* Render environmental atmosphere lighting */}
      <Environment background preset='sunset' blur={0.8} />
    </Canvas>
  )
}
