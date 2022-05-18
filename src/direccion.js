
const pedirDirecciones = async address => {

}


const generarDireccion = (div, label, name, onSelect) => {
	let id = name;


	let container = document.createElement('div');
	container.className = 'direccion_contenedor';
	let labelEl = document.createElement('label');
	labelEl.setAttribute('for', name);
	container.appendChild(labelEl);


	let contenedorElementos = document.createElement('div');
	contenedorElementos.className = 'direccion_elementos';


	container.appendChild(labelEl);

	let input = document.createElement('input');
	input.setAttribute('name', name);
	input.setAttribute('id', id);
	input.onChange = async e => {
		let address = e.target.value;
		let direcciones = await pedirDirecciones(address);
		contenedorElementos.innerHTML = '';
		direcciones.forEach(direccion => {
			let div = document.createElement('div');
			div.className = 'direccion_elemento';
			div.innerHTML = direccion.texto;
			div.onClick = () => {
				onSelect(direccion);
				contenedorElementos.innerHTML = '';
				contenedorElementos.push(div);
			}
		});
	}

	div.appendChild = container;
}