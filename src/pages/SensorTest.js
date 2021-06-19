import React, {useEffect} from 'react'

function SensorTestPage() {

	useEffect(() => {
		// let video = document.createElement('video')
		let video = document.querySelector('video')
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
				.then(function (stream) {
					video.srcObject = stream;
				})
				.catch(function (err0r) {
					console.log("Something went wrong!");
				});

		}
	}, [])

	return (
		<div>
			Testing Sensor APIs
			<video autoPlay={true} muted playsInline={true} width={500} height={350}>

			</video>
		</div>
	)

}

export default SensorTestPage
