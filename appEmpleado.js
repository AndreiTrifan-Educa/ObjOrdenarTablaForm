"use strict"

class Empleado{
    #dni; //La # significa que son atributos privados
    #nombre;
    #apellido;
    #email;
    #nacimiento; /*dd-mm-yyyy*/
    #sueldo;

    constructor(dni, nombre, apellido, email, nacimiento, sueldo){
        this.#dni=dni;
        this.#nombre=nombre;
        this.#apellido=apellido;
        this.#email=email;
        this.#nacimiento=nacimiento;
        this.#sueldo=sueldo;
    }

    getDNI(){
        return this.#dni;
    }
    getNombre(){
        return this.#nombre;
    }
    getApellido(){
        return this.#apellido;
    }
    getEmail(){
        return this.#email;
    }
    getNacimiento(){
        return this.#nacimiento;
    }
    getSueldo(){
        return this.#sueldo;
    }
    toString(){
        return `<tr>
                    <td>${this.#dni}</td>
                    <td>${this.#nombre}</td>
                    <td>${this.#apellido}</td>
                    <td>${this.#email}</td>
                    <td>${this.#nacimiento}</td>
                    <td>${this.#sueldo}</td>
                </tr>`;
    }

}

let empleados = [
    new Empleado("72377544U", "Andrés", "García", "garcia@gmail.com", 1985, 2500),
    new Empleado("72376644A", "María", "Lopez", "maria@gmail.com", 1990, 2700),
    new Empleado("72346344T", "Juan", "Pérez", "perez@gmail.com", 1982, 2900),
    new Empleado("72765764G", "Laura", "Martínez", "martinez@gmail.com", 1995, 2300),
    new Empleado("72435964P", "Carlos", "Hernández", "hernandez@gmail.com", 1988, 3100),
    new Empleado("72977864X", "Elena", "González", "gonzalez@gmail.com", 1992, 2600),
    new Empleado("72564864Y", "Sergio", "Rodríguez", "rodriguez@gmail.com", 1987, 2800),
    new Empleado("34567864O", "Ana", "Sánchez", "sanchez@gmail.com", 1994, 2400),
    new Empleado("46787864Q", "Fernando", "Ramírez", "ramirez@gmail.com", 1989, 3200),
    new Empleado("65567864I", "Patricia", "Fernández", "fernandez@gmail.com", 1991, 3000),
  ];

let tabla = document.getElementById("tabla");

/* REFERENCIA forEach
numeros.forEach((numero) => {
  console.log(numero); 
}); 
*/

let tipoOrden="";

const camposFormulario = [
    { label: "DNI:", type: "text", id: "dniF", name: "dniF"},
    { label: "Nombre:", type: "text", id: "nombreF", name: "nombreF"},
    { label: "Apellido:", type: "text", id: "apellidoF", name: "apellidoF"},
    { label: "Email:", type: "text", id: "emailF", name: "emailF"},
    { label: "Fecha de Nacimiento:", type: "text", id: "fecha_nacimientoF", name: "fecha_nacimientoF"},
    { label: "Sueldo:", type: "number", id: "sueldoF", name: "sueldoF", step: "0.01"},
];

function construirTabla(empleados){
    tabla.innerHTML=null;
    empleados.forEach((empleado) => {
        tabla.innerHTML += empleado.toString();
    });
}

function construirFormulario(){
    const boton=document.createElement("button");
    camposFormulario.forEach(campo => {
        const formulario=document.getElementById("formulario");
        const label=document.createElement("label");
        const input=document.createElement("input");
        const br=document.createElement("br");
        
        label.textContent=campo.label;
        formulario.appendChild(label);

        input.type=campo.type;
        input.id=campo.id;
        input.name=campo.name;
        formulario.appendChild(input);
        formulario.appendChild(br);
    });

    boton.type="submit";
    boton.textContent="Enviar";
    formulario.appendChild(boton);
}

construirFormulario()

function ordenarNombre(){
    if(tipoOrden!="NombreMayor"){
        empleados.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
        construirTabla(empleados);
        tipoOrden="NombreMayor";
    }else{
        empleados.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
        construirTabla(empleados);
        tipoOrden="";
    }
    
}

function ordenarApellido(){
    if(tipoOrden!="ApellidoMayor"){
        empleados.sort((a, b) => a.getApellido().localeCompare(b.getApellido()));
        construirTabla(empleados);
        tipoOrden="ApellidoMayor";
    }else{
        empleados.sort((a, b) => b.getApellido().localeCompare(a.getApellido()));
        construirTabla(empleados);
        tipoOrden="";
    }
}

function ordenarNacimiento(){
    if(tipoOrden!="NacimientoMayor"){
        empleados.sort((a, b) => a.getNacimiento()-b.getNacimiento());
        construirTabla(empleados);
        tipoOrden="NacimientoMayor";
    }else{
        empleados.sort((a, b) => b.getNacimiento()-a.getNacimiento());
        construirTabla(empleados);
        tipoOrden="";
    }
}

function ordenarSueldo(){
    if(tipoOrden!="SueldoMayor"){
        empleados.sort((a, b) => a.getSueldo()-b.getSueldo());
        construirTabla(empleados);
        tipoOrden="SueldoMayor";
    }else{
        empleados.sort((a, b) => b.getSueldo()-a.getSueldo());
        construirTabla(empleados);
        tipoOrden="";
    }
}

function ordenarEmail(){
    if(tipoOrden!="EmailMayor"){
        empleados.sort((a, b) => a.getEmail().localeCompare(b.getEmail()));
        construirTabla(empleados);
        tipoOrden="EmailMayor";
    }else{
        empleados.sort((a, b) => b.getEmail().localeCompare(a.getEmail()));
        construirTabla(empleados);
        tipoOrden="";
    }
}

function validarDNI(dni) {
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE"; 
    const numeros = dni.slice(0,-1); //El num negativo significa que empieza a contar por el final
    const letra = dni.slice(-1).toUpperCase(); //Extrae la última letra y la convierte en mayúscula

    if (!/^\d{8}$/.test(numeros)) {
        return false;
    }

    const indice = parseInt(numeros)%23;
    const letraCorrecta = letras[indice];

    return letra === letraCorrecta;
}


function validarEmail(email){
    const expReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expReg.test(email);
}


construirTabla(empleados);
document.getElementById("nombre").addEventListener("click", ordenarNombre);
document.getElementById("apellido").addEventListener("click", ordenarApellido);
document.getElementById("nacimiento").addEventListener("click", ordenarNacimiento);
document.getElementById("email").addEventListener("click", ordenarEmail);
document.getElementById("sueldo").addEventListener("click", ordenarSueldo);

document.querySelector("form").addEventListener("submit", function(evento) {
    evento.preventDefault(); //Evita que se actualice la página
    const dniForm = document.getElementById("dniF").value;
    const nombreForm = document.getElementById("nombreF").value;
    const apellidoForm = document.getElementById("apellidoF").value;
    const emailForm = document.getElementById("emailF").value;
    const nacimientoForm = document.getElementById("fecha_nacimientoF").value;
    const sueldoForm = parseFloat(document.getElementById("sueldoF").value);

    if(validarEmail(emailForm) && validarDNI(dniForm)){
        const nuevoEmpleado = new Empleado(dniForm, nombreForm, apellidoForm, emailForm, nacimientoForm, sueldoForm);
        empleados.push(nuevoEmpleado);

        construirTabla(empleados);

        evento.target.reset(); //Esto hace que una vez enviado el formulario limpie sus campos por si
                           //queremos insertar otra persona
    }else{
        alert("Datos incorrectos");
    } 
});

document.getElementById("emailF").addEventListener("blur", (e) => {
    let emailForm = e.target.value;
    if(validarEmail(emailForm)){
        document.getElementById("emailF").setAttribute("style", "border: green 1px solid");
    }else{
        document.getElementById("emailF").setAttribute("style", "border: red 1px solid");
    }
});

document.getElementById("dniF").addEventListener("input", (e) => {
    let dniForm = e.target.value;
    if(validarDNI(dniForm)){
        document.getElementById("dniF").setAttribute("style", "background-color: #d4edda");
    }else{
        document.getElementById("dniF").setAttribute("style", "background-color: #f8d7da");
    }
});