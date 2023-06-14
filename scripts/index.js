
function cargarTarjetas(){
    var active = "active"
    var elementoPadre = document.getElementById("listaTarjetas")
    var botonEliminar = document.getElementById("comenzar")

    elementoPadre.classList.remove("boton-tarjeta")

    elementoPadre = botonEliminar.parentNode
    elementoPadre.removeChild(botonEliminar)

    console.log("first")
    for(var i = 0; i < tarjetas.length; i++){
        listaTarjetas.innerHTML += `<article class="card-gramar-main carousel-item ${active}">
            <section>
                <section class="card-img-content">
                    <img src=${tarjetas[i].tarjeta.imagen} alt="ice-cream-image" />
            </section>
            </section>

            <section class="card-title-content">
                <label class="card-title-text">${tarjetas[i].tarjeta.descripcion}</label>
            </section>

            <section class="card-write-answer">
                <input id="${tarjetas[i].id}" class="card-input" type="text" placeholder="Escribe tu respuesta">

                <button 
                class="card-button" 
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdrop"
                id="${tarjetas[i].id}"  
                data-tarjeta-id="${tarjetas[i].id}"
                onclick="verificar(this.id)">
                Verificar
                </button>
            </section>
        </article>`

        var inputTarjeta = document.getElementById(tarjetas[i].id);
        console.log(inputTarjeta)
        inputTarjeta.addEventListener("input", function(event) {
        clearTimeout(this.timeout); // Limpiar el timeout existente
        this.timeout = setTimeout(function() {
            mensajeInactividad(tarjetas[i].id);
        }, 8000); // Esperar 3 segundos de inactividad antes de mostrar el mensaje
        });
        active = ""
    }
   
}

function verificar(id){
    console.log(id.slice(-1))
    var correcta = tarjetas[parseInt(id.slice(-1))].tarjeta.respuestaCorrecta;
    console.log(correcta,"corrrecta")
    let respuesta = document.getElementById(id).value;
    console.log(respuesta)
    if(correcta.toUpperCase() == respuesta.toUpperCase()){
        document.getElementById("modal-body").innerHTML = `Felicidades, tu respuesta es correcta!!! \u{1F604}`
        document.getElementById("modal-button").innerHTML = `Continuar`
    }else{
        for( var i = 0; i<tarjetas[parseInt(id.slice(-1))].tarjeta.posiblesRespuestas.length; i++){
            let resposible = tarjetas[parseInt(id.slice(-1))].tarjeta.posiblesRespuestas[i].trim();
            let respuesta = document.getElementById(id).value.trim();
            if(resposible.toUpperCase() == respuesta.toUpperCase()){
                console.log("entro")
                document.getElementById("modal-body").innerHTML = `Casi lo consigues! \u{1F609} <br> La respuesta correcta es "${correcta}"`
                document.getElementById("modal-button").innerHTML = `Continuar`
                break;
            }else{
                var pistas = tarjetas[parseInt(id.slice(-1))].tarjeta.pistas;
                var random = Math.floor(Math.random() * pistas.length);
                document.getElementById("modal-body").innerHTML = `No es la respuesta esperada \u{2639} <br> Aquí tienes una pista "${pistas[random]}"`
                document.getElementById("modal-button").innerHTML = `Aceptar`
            }
        }
        
    }
}

function checkAnswer(){
    let button = document.getElementById("modal-button");
    if(button.innerHTML === "Continuar"){
        document.getElementById("next-carousel-button").click();
    }
}


  function mensajeInactividad(id){
    var pistas = tarjetas[parseInt(id.slice(-1))].tarjeta.pistas;
    var random = Math.floor(Math.random() * pistas.length);
    document.getElementById("modal-body").innerHTML = `No te congeles \u{1F976}! <br> Aquí tienes una pista "${pistas[random]}"`
    document.getElementById("modal-button").innerHTML = `Aceptar`
  }