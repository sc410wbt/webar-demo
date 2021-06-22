import React, {useState, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from '../OrbitControls'

// import exampleSrc from '../textures/pano.mp4'
import exampleSrc from '../textures/youtube-short.mp4'

import s from './VideoTest.module.sass'

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer( { antialias: true })
let camera
let controls
let video

function VideoTestPage() {

	const [playing, setPlaying] = useState(false)

	useEffect(() => {
		console.log('setting up virtual environment')
		window.scrollTo(0, 0)
		const appWrapper = document.querySelector('.' + s.webgl)
		if (appWrapper.children.length <= 0) appWrapper.appendChild(renderer.domElement)

		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 300)
		camera.position.set(0,0,0.01)
		renderer.setClearColor(0x030303, 1)
		renderer.setPixelRatio(1.5) //window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = THREE.PCFSoftShadowMap

		controls = new OrbitControls(camera, renderer.domElement)
		// controls.maxPolarAngle = Math.PI / 2 + 0.15
		// controls.minPolarAngle = Math.PI / 2 - 0.15
		// controls.maxAzimuthAngle = 0.7
		// controls.minAzimuthAngle = -0.7
		controls.enableZoom = false
		controls.enableDamping = true
		// controls.dampingFactor = 0.12
		// controls.rotateSpeed *= 0.4

		populate()
		light()
		animate()

	}, [])

	function populate() {
		// let cubeG = new THREE.BoxBufferGeometry(1, 1, 1)
		// let cubeM = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
		// let cube = new THREE.Mesh(cubeG, cubeM)
		// cube.position.set(0, 2, 0)
		// scene.add(cube)

		video = document.createElement('video')

		video.src = exampleSrc
		video.loop = true
		video.preload = 'auto'
		video.playsInline = true
		// video.muted = true
		video.autoplay = true
		// video.poster = poster

		let videoTexture = new THREE.VideoTexture(video)
		videoTexture.needsUpdate = true
		videoTexture.minFilter = THREE.LinearFilter
		videoTexture.magFilter = THREE.LinearFilter
		videoTexture.wrapS = THREE.RepeatWrapping
		videoTexture.wrapT = THREE.RepeatWrapping
		// videoTexture.flipY = true
		// videoTexture.repeat.set(1.01, 1) // no negative values for iOS
		// videoTexture.offset.set(-0.1, 0)
		videoTexture.format = THREE.RGBFormat
		videoTexture.crossOrigin = 'anonymous'

		let sphereG = new THREE.SphereBufferGeometry(1, 40, 40)
		let sphereM = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, map: videoTexture })
		let sphere = new THREE.Mesh(sphereG, sphereM)
		sphere.position.set(0, 0, 0)
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

	function playVideo() {
		setPlaying(true)
		scene.rotation.set(0, 1.5, 0)
		video.play()
	}

	return (
		<div>
			<div className={s.webgl} />
			<div className={s.play + ' ' + (playing === true ? s.hidden : '')} onClick={playVideo}>Play</div>
		</div>
	)
}

export default VideoTestPage
