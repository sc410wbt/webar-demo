import React, {useState, useEffect} from 'react'

import s from './SensorTest.module.sass'

function SensorTestPage() {

	const [stats, setStats] = useState(null)
	const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 })

	useEffect(() => {
		// let video = document.createElement('video')
		let video = document.querySelector('video')
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
				.then(function (stream) {
					video.srcObject = stream;
				})
				.catch(function (err0r) {
					console.log("Something went wrong!");
				});

		}
		bindDeviceSensors()
	}, [])

	function getPermissions() {
		DeviceMotionEvent.requestPermission().then(response => {
			if (response == 'granted') {
				// Add a listener to get smartphone orientation
				// in the alpha-beta-gamma axes (units in degrees)
				bindDeviceSensors()
			}
		});
	}

	function bindDeviceSensors() {
		window.addEventListener('devicemotion', (event) => {
			setAccel({ x: event.acceleration.x, y: event.acceleration.y, z: event.acceleration.z })
		})
		window.addEventListener('deviceorientation',(event) => {
			// Expose each orientation angle in a more readable way
			let rotation_degrees = event.alpha
			let frontToBack_degrees = event.beta
			let leftToRight_degrees = event.gamma
			setStats(rotation_degrees + ' ' + frontToBack_degrees + ' ' + leftToRight_degrees)

			// // Update velocity according to how tilted the phone is
			// // Since phones are narrower than they are long, double the increase to the x velocity
			// vx = vx + leftToRight_degrees * updateRate*2;
			// vy = vy + frontToBack_degrees * updateRate;
			//
			// // Update position and clip it to bounds
			// px = px + vx*.5;
			// if (px > 98 || px < 0){
			// 	px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
			// 	vx = 0;
			// }
			//
			// py = py + vy*.5;
			// if (py > 98 || py < 0){
			// 	py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
			// 	vy = 0;
			// }
			//
			// dot = document.getElementsByClassName("indicatorDot")[0]
			// dot.setAttribute('style', "left:" + (px) + "%;" +
			// 	"top:" + (py) + "%;");

		})
	}

	return (
		<div className={s.wrapper}>
			<video autoPlay={true} muted playsInline={true} />
			<div className={s.dev}>
				<div onClick={getPermissions}>Dev Stats:</div>
				<div>
					{stats}
				</div>
				<div>
					<div>Motion</div>
					<div>x: {accel.x}</div>
					<div>y: {accel.y}</div>
					<div>z: {accel.z}</div>
				</div>
			</div>
		</div>
	)

}

export default SensorTestPage
