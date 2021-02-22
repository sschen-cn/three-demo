import * as THREE from 'three'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1e10)
camera.position.y = 50
camera.position.z = -25
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setClearColor(0xFFFFFF)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const trackballControls = new TrackballControls(camera, renderer.domElement)
// trackballControls.rotateSpeed = 5.0
// trackballControls.zoomSpeed = 5
// trackballControls.panSpeed = 2
// trackballControls.noPan = false
// trackballControls.noZoom = false
// trackballControls.staticMoving = true
// trackballControls.dynamicDampingFactor = 0.3

new OrbitControls(camera, renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(200, 200, 1000).normalize()

camera.add(light)
camera.add(light.target)

// 地面
const planeBufferGeometry = new THREE.PlaneBufferGeometry(1000, 1000)
const plane = new THREE.Mesh(planeBufferGeometry, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }))
plane.rotation.x = - Math.PI / 2
plane.name = "plane"
scene.add(plane)
scene.add(new THREE.GridHelper(100, 100))

// 3D辅助线
const axesHelper = new THREE.AxesHelper(500)
scene.add(axesHelper)

// VTK素材 MeshLambertMaterial材质无法正确渲染
let bunny
const vtkLoader = new VTKLoader()
const bunnyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })
vtkLoader.loadAsync('src/assets/models/vtk/bunny.vtk', (e) => {
  console.log('model loading... ' + Math.floor(e.loaded / e.total * 100) + '%')
}).then((geometry: THREE.BufferGeometry) => {
  geometry.computeVertexNormals()
  geometry.scale(100, 100, 100)
  bunny = new THREE.Mesh(geometry, bunnyMaterial)
  bunny.position.set(20, 0, 0)
  scene.add(bunny)
})

// glTF素材
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
const animationMixer = new THREE.AnimationMixer(scene)
const clock = new THREE.Clock()
dracoLoader.setDecoderPath('/examples/js/libs/draco/')
loader.setDRACOLoader(dracoLoader)
let bee: GLTF
loader.loadAsync('src/assets/models/glTF/Bee.glb', (e) => {
  console.log('model loading... ' + Math.floor(e.loaded / e.total * 100) + '%')
}).then((gltf: GLTF) => {
  console.log(gltf)
  scene.add(gltf.scene)
  bee = gltf
  const beeIdleAnimationController = animationMixer.clipAction(bee.animations[0])
  const beeHoverAnimationController = animationMixer.clipAction(bee.animations[1])
  const beeTakeOffAndLandAnimationController = animationMixer.clipAction(bee.animations[2])
  // beeIdleAnimationController.play()
  // beeHoverAnimationController.play()
  beeTakeOffAndLandAnimationController.play()
  // bee.animations[0]
  // gltf.animations // Array<THREE.AnimationClip>
  // gltf.scene // THREE.Group
  // gltf.scenes // Array<THREE.Group>
  // gltf.cameras // Array<THREE.Camera>
  // gltf.asset
})

renderer.domElement.addEventListener("click", event => {
  const { offsetX, offsetY } = event
  const x = (offsetX / window.innerWidth) * 2 - 1
  const y = (offsetY / window.innerHeight) * 2 + 1
  const mousePoint = new THREE.Vector2(offsetX, offsetY)
  const rayCaster = new THREE.Raycaster()
  rayCaster.setFromCamera(mousePoint, camera)
  let intersects = rayCaster.intersectObjects(scene.children, true)
  intersects = intersects.filter(intersect => !(intersect.object instanceof THREE.GridHelper) && intersect.object.name !== "plane")
  console.log(intersects)
})

function animate() {
  requestAnimationFrame(animate)
  // trackballControls.update()
  animationMixer.update(clock.getDelta())
  renderer.render(scene, camera)
}

animate()