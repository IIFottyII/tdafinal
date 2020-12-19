window.addEventListener('load', function() {

	let items = document.querySelector('.items');

	cargarTarjetas();
	
	function cargarTarjetas() {
		fetch("/cita")
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			
			let tarjetas = [];

			// Transformacion de objeto json a tarjetas
			for(let i = 0; i < json.length; i++) {
				tarjetas.push(tarjeta(json[i]));
			}

			// Seteamos todas nuestras tarjetas
			items.innerHTML = tarjetas.join("");

			// boton para editar la cita
			let editBtn = document.querySelectorAll('.edit');
			editBtn.forEach( function(elemento) {
				elemento.addEventListener('click', function(e) {

					// Obtener la tarjeta padre
					let card = e.target.parentNode.parentNode.parentNode;
					
					// Cambiar de tarjeta en el contenedor
					items.innerHTML = editarTarjeta({
						id: card.querySelector('.id').textContent,
						nombre: card.querySelector('.nombre > span').textContent,
						fecha: card.querySelector('.fecha').textContent,
						doctor: card.querySelector('.doctor').textContent.slice(4),
						pruebas: card.querySelector('.pruebas').textContent
					});

					// Boton para actualizar 
					let putBtn = document.querySelector('.put-btn');
					putBtn.addEventListener('click', function(e) {

						let data = new FormData();

						data.append("id", document.querySelector('.id').textContent);
						data.append("nombre", document.querySelector('.nombre > input').value);
						data.append("fecha", document.querySelector('.fecha > input').value);
						data.append("doctor", document.querySelector('.doctor > input').value);
						data.append("pruebas", document.querySelector('.pruebas > input').value);

						document.querySelector('.items').innerHTML = loader();

						let object = {};

					    // Transformamos el objeto form data en objeto javascript
					    data.forEach(function(value, key){
					        object[key] = value;
					    });
					      
					    // Transformar objeto javascript en objeto json
					    let json = JSON.stringify(object);

						fetch("/cita", {
							method: 'PUT',
							body: json
						})
						.then(function(response) {
							cargarTarjetas();
						})
						.catch(function(e) {
							console.log(e);
						});
					});

				});
			});

			// Boton para eliminar cita
			let eraseBtn = document.querySelectorAll('div.erase-btn > span');
			eraseBtn.forEach(function(elemento) {
				elemento.addEventListener('click', function(e) {
					let card = e.target.parentNode.parentNode.parentNode;
					let nombre = card.querySelector('div.nombre > span').textContent;
					
					e.target.parentNode.innerHTML = deleteLoader();

					fetch(`/cita/${nombre}`, {
						method: 'DELETE'
					})
					.then(function(response) {
						console.log(response);
						if(response.ok) {
							cargarTarjetas();
						}
						else {
							alert("Algo salio mal intentando borrar");
						}
					});
				});
			});
		});
	}

	// Tarjetas donde aparecen los datos
	function tarjeta(datos) {
		return `
			<div class="card">
				<div class="id">${datos.id}</div>
				<div class="info">
					<div class="nombre data">
						<span>${datos.nombre}</span>
					</div>
					<div class="fecha data">${datos.fecha}</div>
					<div class="doctor data">Dr. ${datos.doctor}</div>
					<div class="pruebas data">${datos.pruebas}</div>
				</div>
				<div class="erase">
					<div class="edit width-50 flex-c">
						<span class="material-icons md-40 md-light">create</span>
					</div>
					<div class="erase-btn width-50 flex-c">
						<span class="material-icons md-40 md-light">delete</span>
					</div>
				</div>
			</div>
		`;
	}

	// tarjeta para editar los datos
	function editarTarjeta(datos) {
		return `
			<div class="editar">
				<div class="informacion">
					<div class="id">${datos.id}</div>
					<div class="nombre data">
						<input type="text" value="${datos.nombre}"/>
					</div>
					<div class="fecha data">
						<input type="text" value="${datos.fecha}"/>
					</div>
					<div class="doctor data">
						<input type="text" value="${datos.doctor}"/>
					</div>
					<div class="pruebas data">
						<input type="text" value="${datos.pruebas}"/>
					</div>
				</div>
				<div class="send-wraper flex-c">
					<input type="submit" value="Enviar" class="put-btn"/>
				</div>
			</div>
		`;
	}

	// Imagen de carga
	function deleteLoader() {
		return `
			<div class="lds-dual-ring"></div>
		`;
	}

	function loader() {
		return `
			<div class="loader">
    			<div class="lds-ring">
    				<div></div>
    				<div></div>
    				<div></div>
    				<div></div>
    			</div>
  			</div>
		`;
	}
});