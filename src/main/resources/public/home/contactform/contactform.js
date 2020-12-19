(function() {

  //Obtener bloque del formulario
  let formulario = document.querySelector('.contactForm');


  formulario.addEventListener('submit', function(e) {

    // Prevenir accion por default
    e.preventDefault();

    let valido = true;
    let inputs = document.querySelectorAll('.form-control');

    let formContainer = document.querySelector('div.form');

    // Verificar que ningun input esté vacio
    inputs.forEach(function(input) {
      if(input.value === "") {
        valido = false;
      }
    });

    // Si no existe algun input vacio se envia 
    if(valido) {

      const data = new FormData(formulario);

      formContainer.innerHTML = plantillaLoader();
    
      var object = {};
      
      // Transformamos el objeto form data en objeto javascript
      data.forEach(function(value, key){
          object[key] = value;
      });
      
      // Transformar objeto javascript en objeto json
      var json = JSON.stringify(object);

      fetch("/cita", {
        method: 'POST',
        body: json
      })
      .then(function(response) {
        if (response.ok) {
          formContainer.innerHTML = plantillaEnviado();
        }
        else {
          alert("Algo salio mal al enviar el formulario");
        }
      });

    } else {
      alert('Algun campo está vacio');
    }
  });

  // plantilla de cargador 
  function plantillaLoader() {

    // backsticks se usan para retornar plantillas 
    return `             
      <div class="loader">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    `;
  }

  // plantilla de enviado
  function plantillaEnviado() {
    return ` 
      <div class="enviado">
        <span>Tu formulario se envió con exito</span>
      </div>
    `;
  }
})();