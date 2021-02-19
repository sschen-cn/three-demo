# three.js 核心 api

```js
// 场景
var scene = new THREE.Scene()
// 相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// 渲染器
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
```

- scene场景类似画布，是所有物体的容器，只需创建该对象即可
- camera相机决定了不同的视角去观测场景里的东西
- renderer渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制

## 绘制网格
```js
import * as THREE from 'three'
require("./assets/style/reset.styl")

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
```

## 让物体动起来
- 一种是让物体改变自己在场景中的位置
- 一种是改变相机的位置

## tween.js 补间动画库
```bash
npm i --save-dev @types/tween.js
```
```js
import TWEEN from '@tweenjs/tween.js'

const tween = new TWEEN.Tween(mesh.rotation).to({ x: 1, y: 1, z: 1 }, 3000).repeat(Infinity).start()
tween.update()
```

## 性能监视
重复渲染需要消耗很多计算机资源，帧数通常用来评估渲染的方式是否在计算机性能支持的范围内。
```bash
npm install stats.js
```
```js
var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms
// 将stats的界面对应左上角
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
function animate() {
  // 渲染代码
  requestAnimationFrame(animate)
  stats.update()
}
animate()
```