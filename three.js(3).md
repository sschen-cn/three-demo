#
## 相机 THREE.Camera
- 正交投影相机 THREE.OrthographicCamera(left, right, top, bottom, near, far)
  参数为相机中心位置距离视景体各个面的距离，以此定义一个视景体，一般的
  ```JS
  // 定义浏览器宽度和高度为视景体高宽，相机正好在窗口的中心上
  var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000)
  ```
- 透视投影相机 THREE.PerspectiveCamera(fov, aspect, near, far)
  - 视角 fov 视角大小决定了视野范围，广角相机通常视角在60以上，视野更大，普通相机一般在45左右
  - 纵横比 aspect 即宽高比，决定相机视野比例
  - near 相机距近处的距离
  - far 相机距远处的距离
  ```js
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
  ```

## 光源
- 环境光 THREE.AmbientLight(hex)
环境光被认为来自任何方向，所有物体都将有同样的明暗程度
- 点光源 THREE.PointLight(color, intensity, distance)
点光源由一点辐射至四面八方，intensity 光的强度， dustance 光的衰减距离
- 平行光 THREE.DirectionalLight(hex, intensity)

```js
// 改变相机位置观测物体被点光源辐射的情况

```

## 纹理
任何图像都可以用来绘制纹理，jpg、gif、canvas、video
- 图片纹理， THREE.TextureLoader().load() 可以加载图片用于绘制纹理
- canvas 纹理

## 3d模型加载

- vtkLoader
  vtk模型加载器，栗子中的bunny兔子
  ``` js
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
  ```

- GLTFLoader()
  glTF文件 .gltf/.glb,最主流的webgl文件格式，栗子中的蜜蜂
  ``` js
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
    const beeTakeOffAndLandAnimationController = animationMixer.clipAction(bee.animations[2])
    beeTakeOffAndLandAnimationController.play()
  })
  ```
  