const url = 'https://espartano.azurewebsites.net/asistencia';
let rellenar = document.querySelector("#rellenar"); 
var nombreAlumno;
var cantidadResultados;

var input = document.getElementById("nombreAlumno");

if (localStorage.getItem("usuario") ==null) {
    //para local
    //window.location="/index.html";
    //para git pages
    window.location="/matricula_Euroamerican_College";
    
}

function cerrarSesion(){
    localStorage.clear();
    window.location="/index.html";
}


input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
   document.getElementById(BuscarAlumno()).click();
  }
});

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
    var numFamilia;

    var informacionAlumno ="";

    array.forEach((alumno,index) => {
        
        // console.log(index);
        if (index == 0) {
            numFamilia= alumno.familia;
            informacionAlumno+=
            ` 
            <div class="row margen">
            <div class=" col-12">polos: ${alumno.cantidadPolo} </div>
                <div class="form-check col-10">
                    <input class="form-check-input valores" type="checkbox" value="${alumno.familia}"  id="${alumno.identificador}"
                        ${alumno.haAsistido === true ? "checked disabled":" " }>
                    <label class="form-check-label" for="${alumno.identificador}">
                        ${alumno.apellidosNombres}
                        </label>
                </div>
                <div class=" ${alumno.color} col-1"></div>
            `   
        }
        else{
            // console.log("Num familia: "+numFamilia);

            if (numFamilia == alumno.familia) {
                informacionAlumno+=
                `
                    <div class="form-check col-10">
                        <input class="form-check-input valores" type="checkbox" value="${alumno.familia}" id="${alumno.identificador}"
                            ${alumno.haAsistido === true ? "checked disabled":" " }>
                        <label class="form-check-label" for="${alumno.identificador}">
                        ${alumno.apellidosNombres}
                        </label>
                    </div>
                    <div class=" ${alumno.color} col-1"></div>
                   
                ` 
            }else{

                informacionAlumno+= `</div>`
                numFamilia = alumno.familia

                informacionAlumno+=
                `
                <div class="row margen">
                <div class="col-12">polos: ${alumno.cantidadPolo} </div>
                    <div class="form-check col-10">
                        <input class="form-check-input valores" type="checkbox" value="${alumno.familia}"  id="${alumno.identificador}"
                            ${alumno.haAsistido === true ? "checked disabled":" " }>
                        <label class="form-check-label" for="${alumno.identificador}">
                            ${alumno.apellidosNombres}
                            </label>
                    </div>
                    <div class=" ${alumno.color} col-1"></div>
                   
                `
            }
        }
    });
    rellenar.innerHTML= informacionAlumno
}

function BuscarAlumno(){
   
    nombreAlumno=document.getElementById("nombreAlumno").value;

    if(nombreAlumno==""){ return alert("Colocar el Nombre o Apellido del alumno" )}

    obtenerDatos(nombreAlumno);
}


