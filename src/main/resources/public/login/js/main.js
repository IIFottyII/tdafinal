window.addEventListener('load', function() {

	let botonEnviar = document.querySelector('.btn');

	botonEnviar.addEventListener('click', function(e) {

		e.preventDefault();

		let valido = true;
		let inputs = document.querySelectorAll(".login-field");
		let btnContainer = document.querySelector('.btn-container');

		inputs.forEach(function(input) {
	      if(input.value === "") {
	        valido = false;
	      }
	    });

	    // Si los inputs no estan vacios se hace la peticion

	    if(valido) {

	    	btnContainer.innerHTML = plantillaLoader();

	    	let url = "/board?" + new URLSearchParams({
		        usuario: inputs[0].value,
		        password: inputs[1].value
		    });

		    /*
 				url = /board?usuario=unusuario+password=1234
		    */

		    fetch(url)
		    .then(function(response) {
		       	if(response.ok) {

		       		// Redirigir pagina
		       		window.location = response.url;
		        }
		        else {
		        	let loader = document.querySelector('div.loader');
		        	btnContainer.removeChild(loader);
		        	btnContainer.append(botonEnviar);
		        }
		    });
	  	} 
	    else {
	      alert('Algun campo está vacio');
	    }
	});

    function plantillaLoader() {
		return `              
		    <div class="loader">
		        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
		    </div>
        `;
	}
});