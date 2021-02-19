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
- 