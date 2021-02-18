# three.js(一)

官网：https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

## 新建项目

这里打算用 webpack 处理开发时环境，ts/stylus 来编写代码，故

```bash
npm init
npm i webpack webpack-cli webpack-dev-server typescript ts-loader stylus stylus-loader css-loader style-loader html-webpack-plugin -D
tsc --init
```

```json
// tsconfig.json
{
	"compilerOptions": {
		"target": "es6",
		"moduleResolution": "node",
	},
	"include": [ "./src/**/*.ts" ],
}
```



创建入口文件和编写 webpack.config.js

```
src
  ——index.ts
public
  ——index.html
webpack.config.js
```

```js
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'three-demo.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'})
  ]
}
```

```json
// package.json 开发环境配置
"scripts": {
    // ...
    "dev": "webpack serve --mode development",
    "build": "webpack --progress --mode production",
},
```



## 引入three.js

```bash
npm i three
```

## 正式编写three-demo

```js
// index.ts
import * as Three from 'three'
require("./assets/style/reset.styl")
import { WEBGL } from 'three/examples/jsm/WebGL'

const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new Three.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new Three.BoxGeometry()
const meterial = new Three.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new Three.Mesh(geometry, meterial)
scene.add(cube)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
function reset() {
  cube.rotation.x = 0
  cube.rotation.y = 0
}

if (WEBGL.isWebGLAvailable()) {
  reset()
  animate()
} else {
  const warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
```

```stylus
// assets/style/reset.styl
*
  margin 0
```

这样第一个three.js 旋转的正方体demo就ok了