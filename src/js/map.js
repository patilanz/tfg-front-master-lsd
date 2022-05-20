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