import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'

import * as THREE from 'three'

import { useFrame } from '@react-three/fiber'
import { CurveModifier, Text3D } from '@react-three/drei'

const CURVE_POINTS = [
  { x: 1, y: 0, z: 1 },
  { x: 1, y: 0, z: -1 },
  { x: -1, y: 0, z: -1 },
  { x: -1, y: 0, z: 1 }
]

export default function CircleText ({ text = 'Hello, World!', fontSize = 1, scale = 1.0, ...rest }) {
  const curveRef = useRef()

  const points = useMemo(() =>
    CURVE_POINTS.map((point) => new THREE.Vector3(
      scale * point.x,
      scale * point.y,
      scale * point.z
    )), [scale]
  )

  const curve = useMemo(
    () => {
      const localCurve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.667)
      return localCurve
    },

    [points]
  )

  // Every Frame, move along the curve
  useFrame((state, delta) => {
    curveRef.current.moveAlongCurve(delta * 0.05)
  })

  return (
      <CurveModifier ref={curveRef} curve={curve}>
        <Text3D
          font='./fonts/Lot_Regular.json'
          size={fontSize}
        >
          {text}
          <meshNormalMaterial />
        </Text3D>
      </CurveModifier>
  )
}

CircleText.propTypes = {
  text: PropTypes.string,
  scale: PropTypes.number,
  fontSize: PropTypes.number
}
