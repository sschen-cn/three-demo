import * as THREE from 'three'
import { WEBGL } from 'three/examples/jsm/WebGL'
import TWEEN from '@tweenjs/tween.js'
import Stats from 'stats.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, meterial)
scene.add(cube)

camera.position.z = 5

const tween = new TWEEN.Tween(cube.rotation).to({ x: Math.PI, y: Math.PI }, 5000).repeat(Infinity).start()

var stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

function animate() {
  requestAnimationFrame(animate)

  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  
  tween.update()
  stats.update()

  renderer.render(scene, camera)
}

if (WEBGL.isWebGLAvailable()) {
  animate()
} else {
  const warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}