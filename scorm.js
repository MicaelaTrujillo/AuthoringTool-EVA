//inicializamos el objeto scorm
let scorm = pipwerks.SCORM;
//Funcion para inicializar el curso
function init() {
    scorm.version = "1.2";
    Mensaje("Iniciando la actividad.");
    let respuesta = scorm.init();
    Mensaje("¿Actividad iniciada correctamente? " + respuesta);
    let nombreUser = scorm.get("cmi.core.student_name");
    console.log(nombreUser)
}

//Asigna el curso como completado-SUCCESS
function CompletarCurso() {
    console.log(score)
    Mensaje("Marcando actividad como completada.");
    respuesta = scorm.set("cmi.core.lesson_status", "completed");
    scorm.set("cmi.core.score.raw", score);
    scorm.set("cmi.core.score.min", "0");
    scorm.set("cmi.core.score.max", "100");
    if (score == 100){
        scorm.set("cmi.core.lesson_status", "passed");
    }
    else{
        scorm.set("cmi.core.lesson_status", "failed");
    }
    scorm.set("cmi.core.exit", "");
    Mensaje("¿Actividad completada? " + respuesta); 
}

// Pregunta ala plataforma por el nombre del usuario
function ObtenerNombre() {
    console.log("Click")
    let nombreUser = scorm.get("cmi.core.student_name");
    console.log(nombreUser)
    document.getElementById("name").value = nombreUser
}

//Termina la conexion con el LMS-Comple
function end() {
    CompletarCurso()
    Mensaje("Conexion terminada.");
    let respuesta = scorm.quit();
    Mensaje("Termino correctamente? " + respuesta);
}

//Manda un Alert al usuario
function Mensaje(msg) {
    alert(msg);
}

//Se ejecuta al cargar la pagina
window.onload = function() {
    init();
}

//Se ejecuta al terminar la pagina
window.onunload = function() {
    end();
}