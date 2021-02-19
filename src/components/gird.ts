import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.z = 3000

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0xFFFFFF, 1.0)

const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -500, 0, 0,
  500, 0, 0
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

for (var i = 0; i <= 20; i++) {

  var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xFF0000, opacity: 0.2 }))
  line.position.y = (i * 50) - 500
  scene.add(line)

  var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xFF0000, opacity: 0.2 }))
  line.position.x = (i * 50) - 500
  line.rotation.z = 90 * Math.PI / 180
  scene.add(line)

}

renderer.render(scene, camera)