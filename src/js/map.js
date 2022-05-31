mapboxAccessToken = 'pk.eyJ1IjoibHl1Ym9zZCIsImEiOiJjbDJkaHZhdGQwOGtpM2xtYjJvem13eW16In0.MGGU6F3qmuLK2TSqfShavQ';

async function getLocation() {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			return navigator.geolocation.getCurrentPosition(data => {
				resolve(data);
			});
		} else {
			reject(1);
		}
	});
}

async function getAddresses(origen, destino){
	let data = {
		from: {
			lat: origen[1],
			lng: origen[0]
		},
		to:{
			lat: destino[1],
			lng: destino[0]
		}
	}

	const rawResponse = await fetch(`${baseURL}/map/directions`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization':"Bearer " + getToken()
		},
		body: JSON.stringify(data)
	});
	const content = await rawResponse.json();
	console.log(content);
	return content;
}

function centrarEntreDosPuntos(a, b) {
	let bounds = new mapboxgl.LngLatBounds(a, b);
	map.fitBounds(bounds, {padding: 50});
}
async function comprobarZoom() {
	if (origen && destino) return centrarEntreDosPuntos(origen, destino);
	if (origen || destino) map.setCenter(origen || destino);
}

function pintarRuta(geometry, origen, destino){
	console.log(geometry);
	try {
		map.removeLayer('LineString');
		map.removeSource('LineString');
	}catch(_){}

	map.addSource('LineString', {
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					'geometry': geometry

				}
			]
		}
	});

	map.addLayer({
		id: 'LineString',
		type: 'line',
		source: 'LineString',
		layout: {
			'line-join': 'round',
			'line-cap': 'round'
		},
		paint: {
			'line-color': '#7b39ee',
			'line-width': 6
		}
	});

	if(origen){
		if (!origenMarker) {
			origenMarker = new mapboxgl.Marker();
			origenMarker.setLngLat(origen);
			origenMarker.addTo(map);
		} else {
			origenMarker.setLngLat(origen);
		}
	}

	if(destino){
		if (!destinoMarker) {
			destinoMarker = new mapboxgl.Marker();
			destinoMarker.setLngLat(destino);
			destinoMarker.addTo(map);
		} else {
			destinoMarker.setLngLat(destino);
		}
	}

}


async function getConductor(){
	const rawResponse = await fetch(`${baseURL}/viaje/conductor`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization':"Bearer " + getToken()
		}
	});
	const content = await rawResponse.json();
	console.log(content);
	return content.conductor;
}

async function getCliente(){
	const rawResponse = await fetch(`${baseURL}/viaje/cliente`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization':"Bearer " + getToken()
		}
	});
	const content = await rawResponse.json();
	console.log(content);
	return content;
}