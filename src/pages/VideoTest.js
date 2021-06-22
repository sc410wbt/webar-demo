import React, {useState, useEffect} from 'react'
import * as THREE from 'three'

import s from './VideoTest.module.sass'

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer( { antialias: true })
let camera
// let controls

function VideoTestPage() {

	useEffect(() => {
		console.log('setting up virtual environment')
		window.scrollTo(0, 0)
		const appWrapper = document.querySelector('.' + s.webgl)
		if (appWrapper.children.length <= 0) appWrapper.appendChild(renderer.domElement)

		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 300)
		camera.position.set(0,0,10)
		renderer.setClearColor(0x030303, 1)
		renderer.setPixelRatio(1.5) //window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = THREE.PCFSoftShadowMap

		// controls = new OrbitControls(camera, renderer.domElement)
		// controls.maxPolarAngle = Math.PI / 2 + 0.15
		// controls.minPolarAngle = Math.PI / 2 - 0.15
		// controls.maxAzimuthAngle = 0.7
		// controls.minAzimuthAngle = -0.7
		// controls.enableZoom = false
		// controls.enableDamping = true
		// controls.dampingFactor = 0.12
		// controls.rotateSpeed *= 0.4

		populate()
		light()
		animate()

	}, [])

	function populate() {
		let cubeG = new THREE.BoxBufferGeometry(1, 1, 1)
		let cubeM = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
		let cube = new THREE.Mesh(cubeG, cubeM)
		cube.position.set(0, 2, 0)
		scene.add(cube)

		let sphereG = new THREE.SphereBufferGeometry(1, 40, 40)
		let sphereM = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })
		let sphere = new THREE.Mesh(sphereG, sphereM)
		sphere.position.set(0, 0, 10)
		scene.add(sphere)
	}

	function light() {
		let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
		scene.add(ambientLight)
	}

	function animate() {
		// scene.rotation.y += 0.01
		renderer.render(scene, camera)
		requestAnimationFrame(animate)
	}

	return (
		<div>
			<div className={s.webgl} />
		</div>
	)
}

export default VideoTestPage
