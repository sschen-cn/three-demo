import * as THREE from 'three'
import { WEBGL } from 'three/examples/jsm/WebGL'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
const cameraR = 10,
  cameraRL = 10 * 2 * Math.PI
camera.position.x = 10
camera.position.z = 10
camera.position.y = 10
camera.lookAt(new THREE.Vector3(0, 0, 0))

// const light = new THREE.AmbientLight(0xFF0000)
// const light = new THREE.PointLight(0x00FFFF)
const light = new THREE.SpotLight(0x00FFFF, 1,50,20)
light.position.set(5, 5, 0)
scene.add(light)

const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }))
scene.add(cube)

const renderer = new THREE.WebGL1Renderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xFFFFFF, 1.0)
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)

// 改变相机在空间中的位置，观测点光源辐射实际情况
let originTouchX: number
let rad: number, originRad = 0
document.body.addEventListener('touchstart', (e) => {
  console.log(e)
  originTouchX = e.touches[0].clientX
})

document.body.addEventListener('touchmove', (e) => {
  // 拖动x、y轴变动，我们让其改变相机在球面的位置
  // console.log(e)
  let offsetX = (e.touches[0].clientX - originTouchX)
  rad = offsetX / cameraRL * Math.PI
  camera.position.x = Math.sin(originRad + rad) * cameraR
  camera.position.z = Math.cos(originRad + rad) * cameraR

  camera.lookAt(new THREE.Vector3(0, 0, 0))
  renderer.render(scene, camera)
})
document.body.addEventListener('touchend', (e) => {
  console.log(e)
  originRad = rad
})