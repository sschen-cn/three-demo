import * as THREE from 'three'
// import * as TrackballControls from 'three/examples/js/controls/TrackballControls.js'

// declare var TrackballControls

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.z = 500
camera.lookAt(new THREE.Vector3(0, 0, 0))

// const controller = new THREE.TrackballControls()

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

