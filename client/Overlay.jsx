import React from 'react'

import { Logo } from '@pmndrs/branding'

export default function Overlay () {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        pmnd.rs
        <br />
        dev collective
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px', fontFamily: 'Meslo', lineHeight: '1.6em', whiteSpace: 'pre' }}>
        &gt; npx gltfjsx model.glb --transform --simplify
        <br />
        &gt; ll
        <br />
        {'-rw-r--r-- 1 ph  94M model.glb'}
        <br />
        {'-rw-r--r-- 1 ph 406K model-transformed.glb'}
      </div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>UWStout - 9/6/2024</div>
      <p>This change was written by Luke M</p>
      <p>Joe O was here</p>
    </div>
  )
}
