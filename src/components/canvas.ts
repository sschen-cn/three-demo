// 时钟绘制

interface ClockOption {
  width?: number
  height?: number
  bgColor?: string | CanvasGradient | CanvasPattern
}

class Clock {
  private _canvas: HTMLCanvasElement = document.createElement('canvas')
  private _timer: NodeJS.Timeout | null = null
  constructor() { }
  create() {
    this.update()
    return this._canvas
  }
  update(option?: ClockOption) {
    const canvas = this._canvas
    canvas.width = option?.width || 200
    canvas.height = option?.height || 200
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // 画布
    ctx.fillStyle = 'orange'
    ctx.clearRect(0, 0, 200, 200)
    ctx.fillRect(0, 0, 200, 200)
    ctx.translate(100, 100)
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'

    // 绘制圆形
    ctx.save()
    ctx.beginPath()
    ctx.arc(0, 0, 90, 0, 2 * Math.PI, true)
    ctx.stroke()
    ctx.fill()
    ctx.restore()

    // 绘制时间 mark
    ctx.save()
    for (let i = 0; i < 12; i++) {
      ctx.beginPath()
      ctx.rotate(Math.PI / 6)
      ctx.moveTo(75, 0)
      ctx.lineTo(85, 0)
      ctx.stroke()
    }
    ctx.restore()

    ctx.save()
    ctx.lineWidth = 5
    for (let i = 0; i < 60; i++) {
      if (i % 5 != 0) {
        ctx.beginPath()
        ctx.moveTo(82, 0)
        ctx.lineTo(85, 0)
        ctx.stroke()
      }
      ctx.rotate(Math.PI / 30)
    }
    ctx.restore()

    // 绘制时、分、秒
    let now = new Date()
    let sec = now.getSeconds()
    let min = now.getMinutes()
    let hr = now.getHours()
    hr = hr >= 12 ? hr - 12 : hr

    ctx.fillStyle = "black"

    ctx.save()
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
    ctx.lineWidth = 12
    ctx.beginPath()
    ctx.moveTo(-10, 0)
    ctx.lineTo(40, 0)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(-10, 0)
    ctx.lineTo(60, 0)
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.fillStyle = '#D40000'
    ctx.strokeStyle = '#D40000'
    ctx.lineWidth = 4
    ctx.rotate(sec * Math.PI / 30)
    ctx.beginPath()
    ctx.moveTo(0, 20)
    ctx.lineTo(0, -70)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(0, 0, 5, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, -75, 5, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.fillStyle = "rgba(0,0,0,0)"
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()

    return canvas
  }
}

const clock = new Clock()
function tick() {
  requestAnimationFrame(tick)
  clock.update()
}
tick()
// document.body.appendChild(clock.create())

import * as THREE from 'three'
import Stats from 'stats.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
camera.lookAt(new THREE.Vector3(0, 0, 0))
camera.position.z = 500
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const texture = new THREE.Texture(clock.create())
texture.needsUpdate = true

class Cube {
  constructor() {
  }
  public create(x: number = 0, y: number = 0, z: number = 0) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ map: texture }))
    cube.position.setX(x)
    cube.position.setY(y)
    cube.position.setZ(z)
    scene.add(cube)

    function animate() {
      requestAnimationFrame(animate)
      texture.needsUpdate = true
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()
  }
}

const cube = new Cube()
cube.create()
cube.create(75)
cube.create(-75)
cube.create(0, -75)
cube.create(0, 75)
cube.create(75, -75)
cube.create(-75, 75)
cube.create(-75, -75)
cube.create(75, 75)