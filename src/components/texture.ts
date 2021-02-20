import * as THREE from 'three'
import { WEBGL } from 'three/examples/jsm/WebGL'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.x = 0
camera.position.z = 5000
camera.position.y = 0
camera.lookAt(new THREE.Vector3(0, 0, 0))
const renderer = new THREE.WebGL1Renderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xFFFFFF, 1.0)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(1920, 1080, 1, 1)

const texture = new THREE.TextureLoader()

texture.load('src/assets/img/1.jpg', (texture) => {
  var material = new THREE.MeshBasicMaterial({ map: texture })
  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  window.addEventListener('resize', onWindowResize, false)
  renderer.render(scene, camera)
})
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// function animate() {
//     requestAnimationFrame(animate)
//     renderer.render(scene, camera)
// }

// animate()
