import * as Three from 'three'
require("./assets/style/reset.styl")
import { WEBGL } from 'three/examples/jsm/WebGL'

const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new Three.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new Three.BoxGeometry()
const meterial = new Three.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new Three.Mesh(geometry, meterial)
scene.add(cube)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
function reset() {
  cube.rotation.x = 0
  cube.rotation.y = 0
}

if (WEBGL.isWebGLAvailable()) {
  reset()
  animate()
} else {
  const warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}