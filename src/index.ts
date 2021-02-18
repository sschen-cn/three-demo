import * as THREE from 'three'
require("./assets/style/reset.styl")
import Stats from 'stats.js'
import TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.z = 600

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0xFFFFFF, 1.0)

// const geometry = new THREE.BufferGeometry()
// const vertices = new Float32Array([
//   -500, 0, 0,
//   500, 0, 0
// ])
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

// for (var i = 0; i <= 20; i++) {
//   var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xFF0000, opacity: 0.2 }))
//   line.position.y = (i * 50) - 500
//   scene.add(line)

//   var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xFF0000, opacity: 0.2 }))
//   line.position.x = (i * 50) - 500
//   line.rotation.z = 90 * Math.PI / 180
//   scene.add(line)
// }

// const geometry = new THREE.BoxGeometry(300, 300, 300)
// const meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, meterial)
// scene.add(cube)

const light1 = new THREE.AmbientLight(0xFF0000)
light1.position.set(100, 100, 200)
scene.add(light1)
const light2 = new THREE.PointLight(0x00FF00)
light2.position.set(0, 0, 300)
scene.add(light2)

const geometry = new THREE.CylinderGeometry(100, 200, 400)
var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

var stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

const tween = new TWEEN.Tween(mesh.rotation).to({ x: 1, y: 1, z: 1 }, 3000).repeat(Infinity).start()
function animate() {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
  stats.update()
  tween.update()
}
animate()
