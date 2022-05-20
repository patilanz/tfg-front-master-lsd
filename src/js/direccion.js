
const pedirDirecciones = async address => {
/*
	return [
		{
			"texto": "Carrer De Pablo Ruíz Picasso, 17488 Cadaqués, Provincia de Gerona, España",
			"coordenadas": [
				3.28039931920508,
				42.2895801284565
			]
		},
		{
			"texto": "Carrer Pablo Picasso, 17490 Llançà, Provincia de Gerona, España",
			"coordenadas": [
				3.1528743817475,
				42.3640921219541
			]
		},
		{
			"texto": "Carrer Pablo Sarasate, 07004 Palma, Islas Baleares, España",
			"coordenadas": [
				2.66356905127088,
				39.588163861673
			]
		},
		{
			"texto": "Carrer Pablo Neruda, 08490 Tordera, provincia de Barcelona, España",
			"coordenadas": [
				2.64377299943275,
				41.6997808523592
			]
		},
		{
			"texto": "Carrer Pablo Neruda, 07181 Calvià, Islas Baleares, España",
			"coordenadas": [
				2.58692586657608,
				39.5472300255994
			]
		}
	];
*/

	const rawResponse = await fetch(`${baseURL}/map/autocomplete?address=` + encodeURIComponent(address), {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		}
	});
	const content = await rawResponse.json();
	return content.calles;
}


const generarDireccion = (div, label, name, onSelect) => {
	let id = name;


	let container = document.createElement('div');
	container.className = 'direccion_contenedor';
	let labelEl = document.createElement('label');
	labelEl.setAttribute('for', name);
	labelEl.innerText = label;
	container.appendChild(labelEl);
	labelEl.className = 'block text-gray-700 text-sm font-bold mb-2';


	let contenedorElementos = document.createElement('div');
	contenedorElementos.className = 'direccion_elementos';


	container.appendChild(labelEl);

	let input = document.createElement('input');
	input.setAttribute('name', name);
	input.setAttribute('id', id);

	const onFunction = async e => {
		let address = e.target.value;
		console.log(address);
		if(address.length <= 5)return;
		let direcciones = await pedirDirecciones(address);
		contenedorElementos.innerHTML = '';
		direcciones.forEach(direccion => {
			let div = document.createElement('div');
			div.className = 'direccion_elemento';
			div.innerHTML = direccion.texto;
			div.onclick = () => {
				onSelect(direccion);
				input.value = direccion.texto;
				contenedorElementos.innerHTML = '';
				container.style.zIndex = '1';
			}
			contenedorElementos.appendChild(div);
			container.style.zIndex = '2';
		});
	}



	input.onkeyup = onFunction;
	//input.onchange = onFunction;

	input.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
	container.appendChild(input);
	container.appendChild(contenedorElementos)

	div.appendChild(container);
}