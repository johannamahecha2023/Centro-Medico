/*obteniendo la informacion por medio del DOM y los IDS */
//campos compartidos entres pacientes y medicos
let Nombres = document.getElementById("Nombres");
let Apellidos = document.getElementById("Apellidos");
let TipoDocumento = document.getElementById("TipoDocumento");
let NumeroDocumento = document.getElementById("NumeroDocumento");
let Celular = document.getElementById("Celular");
let Especialidad = document.getElementById("Especialidad");
//elementos propios de medicos
const Consultorio = document.getElementById("Consultorio");
const Correo = document.getElementById("Correo");
//elementos propios de pacientes
let Edad = document.getElementById("Edad");
//llamado de formularios
const FormularioMedicos = document.getElementById("Registro-Medicos-Form");
const FormularioPacientes = document.getElementById("Registro-Pacientes-Form");

class Registro {
  constructor(
    Nombres,
    Apellidos,
    TipoDocumento,
    NumeroDocumento,
    Celular,
    Especialidad
  ) {
    this.Nombres = Nombres;
    this.Apellidos = Apellidos;
    this.TipoDocumento = TipoDocumento;
    this.NumeroDocumento = NumeroDocumento;
    this.Celular = Celular;
    this.Especialidad = Especialidad;
  }
}
const mostrarMedicos = function () {
  //creamos un arreglo donde vamos a guardar el LocalStorage
  let medicos = [];
  let cuerpoTabla = document.getElementById("Cuerpo-Lista-Medicos");
  /*ahora guardame en esta variable
      lo que esta en el localstorage con la llave que le
       pusimos que fue medicos*/
  let localMedicos = localStorage.getItem("medicos");
  //si localmedicos no esta vacia
  if (localMedicos) {
    /*lo que hay en local storage (kay:medicos) esta en formato
        json entonces toca pasarlo a objeto para que 
        podamos recorrer el arreglo */
    //medicos
    medicos = JSON.parse(localMedicos);
  }
  //por cada medico que encuentre va agragar una fila
  medicos.forEach((medico) => {
    let fila = document.createElement("tr");
    /*para crear celda en DOM tiene un metodo que es 
        insertCell() */
    let celdaNombres = fila.insertCell();
    let celdaApellidos = fila.insertCell();
    let celdaTipoDocumento = fila.insertCell();
    let celdaNumeroDocumento = fila.insertCell();
    let celdaConsultorio = fila.insertCell();
    let celdaCelular = fila.insertCell();
    let celdaCorreo = fila.insertCell();
    let celdaEspecialidad = fila.insertCell();
    let celdaPaciente = fila.insertCell();

    celdaNombres.textContent = medico.Nombres;
    celdaApellidos.textContent = medico.Apellidos;
    celdaTipoDocumento.textContent = medico.TipoDocumento;
    celdaNumeroDocumento.textContent = medico.NumeroDocumento;
    celdaConsultorio.textContent = medico.Consultorio;
    celdaCelular.textContent = medico.Celular;
    celdaCorreo.textContent = medico.Correo;
    celdaEspecialidad.textContent = medico.Especialidad;
    celdaPaciente.textContent = "sin asignar";
    cuerpoTabla.appendChild(fila);
  });
};
if (window.location.href.endsWith("listado_medicos.html")) {
    mostrarMedicos();
}
if (window.location.href.endsWith("registro-medicos.html")) {
  //el evento de formulario medico va ser de tipo submit
  FormularioMedicos.addEventListener("submit", function (event) {
    //previene que la pagina se recargue sin antes hacer la logica
    event.preventDefault();
    let valorNombres = Nombres.value;
    let valorApellidos = Apellidos.value;
    let valorTipoDocumento = TipoDocumento.value;
    let valorNumeroDocumento = NumeroDocumento.value;
    let valorCelular = Celular.value;
    let valorEspecialidad = Especialidad.value;
    let valorConsultorio = Consultorio.value;
    let valorCorreo = Correo.value;

    // instancio
    const Medicos = new Registro(
      valorNombres,
      valorApellidos,
      valorTipoDocumento,
      valorNumeroDocumento,
      valorCelular,
      valorEspecialidad
    );
    Medicos.Consultorio = valorConsultorio;
    Medicos.Correo = valorCorreo;
    let medicos = [];
    //vamos a llamar medicos a la llave
    localMedicos = localStorage.getItem("medicos");
    /*si local medicos no esta vacio, entonces lo convierte en objeto
      para despues poder hacer push*/
    if (localMedicos) {
      //pasamos nuestro arreglo medicos=[] a formato objeto
      medicos = JSON.parse(localMedicos);
    }
    //ahora podemos hacer el push de nuestro objeto que llamamos Medicos (cuando intanciamos lo llamamos Medicos)
    medicos.push(Medicos);
    //luego de hacer el push paso de nuevo a formato json el objeto

    /*y finalmente pasamos a formato json, la llave la
      llamamos medicos arriba en el getItem y luego el json que queremos
      mandar (medicos que es el nombre del arreglo)*/
    localStorage.setItem("medicos", JSON.stringify(medicos));
    alert(`medico registrado exitosamente`);
  });
}
