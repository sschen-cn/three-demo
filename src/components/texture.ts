import * as THREE from 'three'
import { WEBGL } from 'three/examples/jsm/WebGL'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.x = 10
camera.position.z = 10
camera.position.y = 10
camera.lookAt(new THREE.Vector3(0, 0, 0))
const renderer = new THREE.WebGL1Renderer({
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xFFFFFF, 1.0)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(500, 300, 1, 1)

const texture = new THREE.TextureLoader()
texture.load("../assets/img/1.jpg", (texture) => {
    var material = new THREE.MeshBasicMaterial({ map: texture })
    var mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
})

renderer.render(scene, camera)
