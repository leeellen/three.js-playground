import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // SCENE
  const scene = new THREE.Scene()

  // CAMERA
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 3

  // light
  const pointLight = new THREE.PointLight('#fff', 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // Texture
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load('../static/textures/stone_basecolor.jpg')
  const textureNormal = textureLoader.load('../static/textures/stone_normal.jpg')
  const textureHeight = textureLoader.load('../static/textures/stone_height.png')
  const textureRoughness = textureLoader.load('../static/textures/stone_roughness.jpg')

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // MESH
  const sphere = new THREE.SphereGeometry(0.3, 32, 16)

  const material1 = new THREE.MeshStandardMaterial({ map: textureBaseColor })
  const obj1 = new THREE.Mesh(sphere, material1)
  obj1.position.x = -2
  scene.add(obj1)

  const material2 = new THREE.MeshStandardMaterial({ map: textureBaseColor, normalMap: textureNormal })
  const obj2 = new THREE.Mesh(sphere, material2)
  obj2.position.x = -1
  scene.add(obj2)

  const material3 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormal,
    displacementMap: textureHeight,
    displacementScale: 0.05,
  })
  const obj3 = new THREE.Mesh(sphere, material3)
  scene.add(obj3)

  const material4 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormal,
    displacementMap: textureHeight,
    displacementScale: 0.05,
    roughnessMap: textureRoughness,
    roughness: 0.5,
  })
  const obj4 = new THREE.Mesh(sphere, material4)
  obj4.position.x = 1
  scene.add(obj4)

  const material5 = new THREE.MeshStandardMaterial({ map: textureBaseColor })
  const obj5 = new THREE.Mesh(sphere, material5)
  obj5.position.x = 2
  scene.add(obj5)

  function render(time) {
    time *= 0.001
    obj1.rotation.y = time
    obj2.rotation.y = time
    obj3.rotation.y = time
    obj4.rotation.y = time
    obj5.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
