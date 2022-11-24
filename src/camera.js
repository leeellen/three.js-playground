import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  //   camera
  /**
   * 화각
   * 광각 : 63 이상
   * 표준 :47
   * 망원 : 8~28
   *
   */
  const fov = 120
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 0.1, 1.8)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  //   light
  const directionalLight = new THREE.DirectionalLight('#fff', 0.1)
  directionalLight.position.set(1, 1, 1)
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 'red')
  scene.add(dlHelper)
  scene.add(directionalLight)

  //   render
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //   obj
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshStandardMaterial({ color: 0xff7f00 })
  const cube = new THREE.Mesh(geometry, material)
  //   cube.position.y = 0.5
  scene.add(cube)

  //   const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  //   const planeMaterial = new THREE.MeshStandardMaterial({ color: 'pink' })
  //   const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  //   plane.rotation.x = -0.5 * Math.PI
  //   plane.position.y = -0.2
  //   scene.add(plane)

  //   render
  function render(time) {
    time *= 0.001
    // obj1.rotation.y = time
    // obj2.rotation.y = time
    // obj3.rotation.y = time
    // obj4.rotation.y = time
    // obj5.rotation.y = time

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
