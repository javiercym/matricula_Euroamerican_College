//const url = 'https://espartano.azurewebsites.net/asistencia';
const url = 'https://espartano.azurewebsites.net/matricula';
let rellenar = document.querySelector("#rellenar"); 
var nombreAlumno;
var cantidadResultados;

var input = document.getElementById("nombreAlumno");

window.onload = () => {
    obtenerDatos2();
}

if (localStorage.getItem("usuario") ==null) {
    window.location="/index.html";
    //window.location="/matricula_Euroamerican_College/";
}

function cerrarSesion(){
    localStorage.clear();
    //para local
    //window.location="/index.html";
    //para git pages
    window.location="/matricula_Euroamerican_College/";
}


input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
   document.getElementById(BuscarAlumno()).click();
  }
});


async function obtenerDatos2(){
    await fetch(url)
        .then(response => response.json())
        .then(json=>{imprimir(json.data),
            cantidadResultados=(json.mensaje);
        });
    if(cantidadResultados =="Se encontraron 0 resultado(s)."){
        alert("No se encontraron resultados")
    }
}



async function obtenerDatos(nombreAlumno){
    await fetch(url+"/"+nombreAlumno)
        .then(response => response.json())
        .then(json=>{imprimir(json.data),
            cantidadResultados=(json.mensaje);
        });
    if(cantidadResultados =="Se encontraron 0 resultado(s)."){
        alert("No se encontraron resultados")
    }
}

let imprimir = (array)=>{

    var informacionAlumno ="";

    array.forEach((alumno) => {
        
        // console.log(index);
        informacionAlumno+=
        ` 
        <tr class=" ${alumno.color}">
            <th scope="row">${alumno.codigoAlumno}</th>
            <td>${alumno.nombreAlumno}</td>
            <td>${alumno.tieneDeuda}</td>
            <td>${alumno.realizoMatricula}</td>
        </tr>
             `   
        
    });
    rellenar.innerHTML= informacionAlumno
}

function BuscarAlumno(){
   
    nombreAlumno=document.getElementById("nombreAlumno").value;

    if(nombreAlumno=="")
    {
        obtenerDatos2();
    }else{
        obtenerDatos(nombreAlumno);
    }

    
}


